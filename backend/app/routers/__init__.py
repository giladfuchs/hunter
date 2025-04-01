from fastapi import APIRouter, Depends

from app.routers import auth, teacher, assigment, student

routes = []
routes = [auth, teacher, assigment, student]

router = APIRouter()

for _ in routes:
    router.include_router(_.router)

_create_module = False

# _create_module = True


@router.on_event("startup")
async def startup_event():
    if _create_module:
        print('create startup')
        from sqlmodel import SQLModel

        from common.db_model import engines

        SQLModel.metadata.drop_all(engines['club'])
        SQLModel.metadata.create_all(engines['club'])
    return
