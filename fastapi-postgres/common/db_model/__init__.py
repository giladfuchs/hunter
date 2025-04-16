from datetime import datetime
from typing import Any, List, Union

from fastapi_crudrouter.core.databases import CALLABLE_LIST
from sqlalchemy.orm import selectinload
from sqlmodel import Session, create_engine, delete, select

from common.config import conf
from common.serializers import BaseTable, DBQuery, FilterQuery
from common.utils.errors import ErrorService
from common.utils.parse_obj import set_elements_by_dict

opts = {
    "eq": "__eq__",
}


class DBModel:
    table = None
    engine = create_engine(conf.POSTGRES_DATABASE_URL, echo=False)

    @classmethod
    def _fetch_or_delete_rows_callable(cls, *args: Any, **kwargs: Any) -> CALLABLE_LIST:
        def route(
            filter_query: FilterQuery = None,
            to_dict: bool = False,
            offset: int = 0,
            limit: int = 1000,
        ) -> List:
            if filter_query is None:
                filter_query = FilterQuery()

            res = cls.fetch_or_delete_rows(
                filter_query=filter_query,
                to_dict=to_dict,
                limit=limit,
                offset=offset,
                **kwargs
            )

            return res

        return route

    @classmethod
    def add_update(cls, row: Union[BaseTable, List[BaseTable]]):
        with Session(cls.engine) as session:
            if type(row) == list:
                for _ in row:
                    try:
                        session.add(_)
                    except Exception as ex:
                        print(ex, _)
                session.commit()
                for _ in row:
                    session.refresh(_)
            else:
                session.add(row)
                session.commit()
                session.refresh(row)

    @classmethod
    def add_or_find_update(
        cls, add_or_id: str, body: BaseTable, **kwargs: Any
    ) -> BaseTable:

        db_obj: BaseTable = body
        user_auth = kwargs.get("user_auth")

        if add_or_id != "add":
            filter_query = FilterQuery(
                query=[DBQuery(key="id", opt="eq", value=add_or_id)]
            )
            db_obj: BaseTable = cls.fetch_or_delete_rows(
                filter_query=filter_query, limit=1, to_dict=False
            )
            if db_obj and (not user_auth or user_auth.id == db_obj.teacher_id):
                set_elements_by_dict(db_obj, body, exclude_items=["id"])
            else:
                ErrorService.error_400(details="not found")

        elif user_auth:
            setattr(db_obj, "teacher_id", user_auth.id)

        cls.add_update(row=db_obj)
        return db_obj

    @classmethod
    def _add_or_find_update_callable(cls, *args: Any, **kwargs: Any) -> CALLABLE_LIST:

        def route(
            add_or_id: str,
            body: Union[None, cls.table],
        ) -> BaseTable:
            return cls.add_or_find_update(add_or_id=add_or_id, body=body)

        return route

    @classmethod
    def generate_query(cls, query: List[DBQuery]):
        query = [_ for _ in query]
        ans = tuple(
            getattr(getattr(cls.table, q.key), opts.get(q.opt, q.opt))(q.value)
            for q in query
            if hasattr(cls.table, q.key)
            and hasattr(getattr(cls.table, q.key), opts.get(q.opt, q.opt))
        )
        return ans

    @classmethod
    def fetch_or_delete_rows(
        cls,
        filter_query: FilterQuery = FilterQuery(),
        to_dict: bool = True,
        offset: int = 0,
        limit: int = 1000,
        **kwargs
    ) -> Union["cls.table", List[BaseTable]]:
        statement = (
            delete(cls.table)
            if not filter_query.relation_model and filter_query.delete_rows
            else select(cls.table)
        )
        if filter_query.delete_rows:
            limit = 0

        if filter_query.query:
            query = cls.generate_query(query=filter_query.query)

            statement = statement.where(*query)
        if filter_query.relation_model:
            statement = statement.options(selectinload("*"))

        if offset:
            statement = statement.offset(offset)
        if limit:
            statement = statement.limit(limit)

        res = None
        try:
            with Session(cls.engine) as session:
                results: List[BaseTable] = session.exec(statement)

                if filter_query.delete_rows:
                    if filter_query.relation_model:
                        session.delete(results.first())
                    session.commit()
                    return
                else:
                    res = [_.dict() for _ in results] if to_dict else list(results)
        except Exception as ex:
            ErrorService.error_400(details=ex)

        if res is None:
            ErrorService.error_400(details="not found")
        if res and limit == 1:
            return res[0]

        return res

    @classmethod
    def get_by_id(cls, _id: int or str, **kwargs):
        filter_query = FilterQuery(
            query=[DBQuery(key="id", opt="eq", value=_id)], relation_model=False
        )
        return cls.fetch_or_delete_rows(
            filter_query=filter_query, limit=1, to_dict=False, **kwargs
        )
