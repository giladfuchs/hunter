from common.db_model import DBModel
from common.db_model.endpoints import DBModelEndpoints
from common.serializers import table_model


class TeacherModel(DBModelEndpoints):
    table = table_model.Teacher


class StudentModel(DBModel):
    table = table_model.Student


class AssignmentModel(DBModel):
    table = table_model.Assignment
