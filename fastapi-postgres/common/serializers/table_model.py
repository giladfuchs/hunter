from typing import List, Optional

from sqlmodel import Field, Relationship, UniqueConstraint

from common.enums import Grade
from common.serializers import IdBaseTable


class Teacher(IdBaseTable, table=True):
    __table_args__ = (UniqueConstraint("phone", "id", name="phone_id"),)
    phone: float
    students: Optional[List["Student"]] = Relationship(
        sa_relationship_kwargs={"cascade": "all, delete"}, back_populates="teacher"
    )

    assignments: Optional[List["Assignment"]] = Relationship(
        sa_relationship_kwargs={"cascade": "all, delete"}, back_populates="teacher"
    )


class Student(IdBaseTable, table=True):
    __table_args__ = (UniqueConstraint("name", "phone", name="name_phone"),)
    teacher_id: int = Field(foreign_key="teacher.id")
    teacher: Teacher = Relationship(back_populates="students")

    name: str
    grade: Grade
    phone: float
    assignments: Optional[List["Assignment"]] = Relationship(
        sa_relationship_kwargs={"cascade": "all, delete"}, back_populates="student"
    )


class Assignment(IdBaseTable, table=True):
    __table_args__ = (UniqueConstraint("id", "title", name="id_title"),)
    student_id: int = Field(foreign_key="student.id")
    student: Student = Relationship(back_populates="assignments")
    teacher_id: int = Field(foreign_key="teacher.id")
    teacher: Teacher = Relationship(back_populates="assignments")

    title: str
    detail: str
