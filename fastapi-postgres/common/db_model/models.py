from typing import List

from common.db_model import DBModel
from common.serializers import FilterQuery, table_model


class TeacherModel(DBModel):
    table = table_model.Teacher


class StudentModel(DBModel):
    table = table_model.Student


class AssignmentModel(DBModel):
    table = table_model.Assignment
