from typing import List

from common.db_model import DBModel
from common.serializers import FilterQuery, table_model


class TeacherModel(DBModel):
    table = table_model.Teacher


class StudentModel(DBModel):
    table = table_model.Student

    @classmethod
    def fetch_or_delete_rows(cls, filter_query: FilterQuery = FilterQuery(), **kwargs):
        res: List[cls.table] = super().fetch_or_delete_rows(
            filter_query=filter_query, **kwargs
        )
        if filter_query.relation_model and not filter_query.delete_rows:
            res: List = [
                {
                    **_.dict(),
                    "assignments": [assignment.dict() for assignment in _.assignments],
                }
                for _ in res
            ]

        return res


class AssignmentModel(DBModel):
    table = table_model.Assignment
