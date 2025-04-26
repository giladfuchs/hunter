from random import choice, randint

from faker import Faker
from sqlmodel import SQLModel

from common.db_model import DBModel
from common.db_model.models import AssignmentModel, StudentModel, TeacherModel
from common.enums import Grade

fake = Faker()


def create_fake_data():
    SQLModel.metadata.drop_all(DBModel.engine)
    SQLModel.metadata.create_all(DBModel.engine)

    teachers = []
    students = []
    assignments = []

    # Create fake teachers
    for _ in range(5):  # Adjust the number as needed
        teacher = TeacherModel.table(phone=randint(10**9, 10**10))
        TeacherModel.add_or_find_update("add", teacher)

        teachers.append(teacher)

    # Create fake students
    for _ in range(25):  # Adjust the number as needed
        teacher = choice(teachers)
        student = StudentModel.table(
            name=fake.name(),
            grade=choice(Grade.values()),
            phone=randint(10**9, 10**10),
            teacher_id=teacher.id,
        )
        StudentModel.add_or_find_update("add", student)

        students.append(student)

    # Create fake assignments
    for _ in range(150):  # Adjust the number as needed
        student = choice(students)

        assignment = AssignmentModel.table(
            title=fake.sentence(nb_words=3),
            detail=fake.text(),
            student_id=student.id,
            teacher_id=student.teacher_id,
        )
        AssignmentModel.add_or_find_update("add", assignment)
        assignments.append(assignment)

    print("Fake data inserted successfully!")


create_fake_data()
