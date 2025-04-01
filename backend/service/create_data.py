from random import choice, randint
from faker import Faker
from sqlmodel import SQLModel

from common.db_model import engines

from common.db_model.models import TeacherModel, StudentModel, AssignmentModel

fake = Faker()


def create_fake_data():
    SQLModel.metadata.drop_all(engines['club'])
    SQLModel.metadata.create_all(engines['club'])

    teachers = []
    students = []
    assignments = []

    # Create fake teachers
    for _ in range(5):  # Adjust the number as needed
        teacher = TeacherModel.table(
            phone=randint(10 ** 2, 10 ** 5)
        )
        TeacherModel.add_or_find_update('add', teacher)

        teachers.append(teacher)

    # Create fake students
    for _ in range(15):  # Adjust the number as needed
        teacher = choice(teachers)
        student = StudentModel.table(
            name=fake.name(),
            grade=choice(["A", "B", "C", "D", "E"]),
            phone=randint(10 ** 2, 10 ** 5),
            teacher_id=teacher.id
        )
        StudentModel.add_or_find_update('add', student)

        students.append(student)

    # Create fake assignments
    for _ in range(30):  # Adjust the number as needed
        student = choice(students)

        assignment = AssignmentModel.table(
            title=fake.sentence(nb_words=3),
            detail=fake.text(),
            student_id=student.id,
            teacher_id=student.teacher_id
        )
        AssignmentModel.add_or_find_update('add', assignment)
        assignments.append(assignment)

    print("Fake data inserted successfully!")


create_fake_data()
