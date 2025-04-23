from typing import List, Optional, Type

from fastapi import APIRouter, Depends

from common.db_model import DBModel
from common.db_model.models import TeacherModel
from common.serializers import DBQuery, FilterQuery
from service.auth import jwt_required


def generate_crud_auth_routes(model: Type[DBModel], prefix: str):
    router = APIRouter(prefix=prefix, tags=[prefix.strip("/")])

    @router.post("")
    async def fetch_or_delete_rows(
        filter_query: Optional[FilterQuery] = FilterQuery(),
        user_auth: TeacherModel.table = Depends(jwt_required),
    ) -> List[model.table]:
        query_id = DBQuery(key="teacher_id", opt="eq", value=user_auth.id)
        if query_id:
            filter_query.query.append(query_id)
        return model.fetch_or_delete_rows(filter_query=filter_query, to_dict=False)

    @router.post("/{add_or_id}")
    async def add_or_update(
        add_or_id: str, body: model.table, user_auth=Depends(jwt_required)
    ):
        model.add_or_find_update(add_or_id=add_or_id, body=body, user_auth=user_auth)
        return True

    return router
