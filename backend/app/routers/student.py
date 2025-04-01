from typing import List

from fastapi import APIRouter, Depends

from common.db_model.models import StudentModel, TeacherModel
from common.serializers import FilterQuery, DBQuery
from service.auth import jwt_required

router = APIRouter(prefix="/student", tags=["student"])


@router.post("/filter")
async def get(_id: DBQuery = None, user_auth: TeacherModel.table = Depends(jwt_required)) -> List[StudentModel.table]:
    filter_query = FilterQuery(relation_model=True, query=[DBQuery(key='teacher_id', opt='eq', value=user_auth.id)])
    if _id:
        filter_query.query.append(_id)
    students = StudentModel.find(filter_query=filter_query, to_dict=False)
    return students


@router.post("/delete")
async def delete(_id: DBQuery = None, user_auth: TeacherModel.table = Depends(jwt_required)) :
    filter_query = FilterQuery(relation_model=True, query=[DBQuery(key='teacher_id', opt='eq', value=user_auth.id)])
    filter_query.flags = ['delete_rows']
    if _id:
        filter_query.query.append(_id)
    StudentModel.find(filter_query=filter_query, to_dict=False)
    return True
@router.post("/{add_or_id}")
async def add_update(add_or_id: str, body: StudentModel.table, user_auth: TeacherModel.table = Depends(jwt_required)):
    StudentModel.add_or_find_update(add_or_id=add_or_id, body=body, user_auth=user_auth)

    return
