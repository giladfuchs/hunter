from typing import List

from common.db_model import DBModel
from common.serializers import FilterQuery

from common.serializers import table_model


class TeacherModel(DBModel):
    table = table_model.Teacher


class StudentModel(DBModel):
    table = table_model.Student

    @classmethod
    def find(cls, filter_query: FilterQuery = FilterQuery(), **kwargs):
        res: cls.table = super().find(filter_query=filter_query,
                                      **kwargs)
        if filter_query.relation_model and not filter_query.flags:
            res: List = [{**_.dict(), "assignments": [assignment.dict() for assignment in _.assignments]} for _ in res]

        return res


class AssignmentModel(DBModel):
    table = table_model.Assignment
