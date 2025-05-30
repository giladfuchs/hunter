from typing import Any, List, Union
from sqlalchemy.orm import selectinload
from sqlmodel import Session, create_engine, select

from common.config import conf
from common.serializers import BaseTable, DBQuery, FilterQuery
from common.utils.errors import ErrorService
from common.utils.parse_obj import set_elements_by_dict

opts = {
    "eq": "__eq__",
    "ne": "__ne__",
    "lt": "__lt__",
    "le": "__le__",
    "gt": "__gt__",
    "ge": "__ge__",
    "like": "like",
    "ilike": "ilike",  # PostgreSQL only
    "in": "in_",
    "not_in": "notin_",
    "is_null": "is_",
}

class DBModel:
    table = None
    engine = create_engine(conf.POSTGRES_DATABASE_URL, echo=False)

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
            db_obj: BaseTable = cls.get_by_id(_id=add_or_id)
            if db_obj and (not user_auth or user_auth.id == db_obj.teacher_id):
                set_elements_by_dict(db_obj, body, exclude_items=["id"])
            else:
                ErrorService.error_400(details="not found")

        elif user_auth:
            setattr(db_obj, "teacher_id", user_auth.id)

        cls.add_update(row=db_obj)
        return db_obj

    # Generate SQLAlchemy filter conditions with AND logic from a list of DBQuery objects
    @classmethod
    def generate_where_query(cls, query: List[DBQuery]):
        # Build a tuple of SQLAlchemy expressions by applying the operator (e.g., ==, >=) on each field
        ans = tuple(
            getattr(getattr(cls.table, q.key), opts.get(q.opt, q.opt))(q.value)
            for q in query
            if hasattr(cls.table, q.key)
            and hasattr(
                getattr(cls.table, q.key), opts.get(q.opt, q.opt)
            )
        )
        return ans

    @classmethod
    def build_query(cls, filter_query: FilterQuery, offset: int = 0, limit: int = 1000):
        statement = select(cls.table)

        if filter_query.query:
            statement = statement.where(*cls.generate_where_query(filter_query.query))

        if filter_query.relation_model:
            statement = statement.options(selectinload("*"))

        if filter_query.sort:
            try:
                field, direction = filter_query.sort.split(":")
                col = getattr(cls.table, field, None)
                if col:
                    direction = direction.lower()
                    statement = statement.order_by(col.asc() if direction == "asc" else col.desc())
            except Exception:
                raise ValueError(f"Invalid sort format: '{filter_query.sort}'. Expected 'field:asc' or 'field:desc'")

        if offset:
            statement = statement.offset(offset)

        if limit:
            statement = statement.limit(limit)

        return statement

    @classmethod
    def fetch_rows(
            cls,
            filter_query: FilterQuery = FilterQuery(),
            offset: int = 0,
            limit: int = 1000,
            to_dict: bool = False,
            **kwargs
    ) -> Union["cls.table", List["cls.table"], dict, List[dict]]:

        statement = cls.build_query(filter_query, offset, limit)

        try:
            with Session(cls.engine) as session:
                results = session.exec(statement)
                res = (
                    [
                        _.dict(include_relations=filter_query.relation_model)
                        for _ in results
                    ]
                    if to_dict or filter_query.relation_model
                    else list(results)
                )
        except Exception as ex:
            ErrorService.error_400(details=ex)

        if not res:
            ErrorService.error_400(details="not found")
        if limit == 1:
            return res[0]
        return res

    @classmethod
    def delete_rows(
            cls, filter_query: FilterQuery = FilterQuery(), offset: int = 0, **kwargs
    ):
        try:
            with Session(cls.engine) as session:
                select_stmt = cls.build_query(filter_query, offset, limit=0)
                results = session.exec(select_stmt).all()
                for obj in results:
                    session.delete(obj)

                session.commit()

        except Exception as ex:
            ErrorService.error_400(details=ex)

    @classmethod
    def get_by_id(cls, _id: int or str, **kwargs):
        filter_query = FilterQuery(
            query=[DBQuery(key="id", opt="eq", value=_id)], relation_model=False
        )
        return cls.fetch_rows(filter_query=filter_query, limit=1, **kwargs)
