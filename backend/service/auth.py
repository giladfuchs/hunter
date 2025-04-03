from datetime import datetime, timedelta

from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from common.config import conf
from common.db_model.models import TeacherModel
from common.serializers import Token, FilterQuery, DBQuery

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def jwt_required(token: str = Depends(oauth2_scheme)) -> str:
    user = AuthService.validate_token(token)
    return user


class AuthService:
    @classmethod
    def error_authenticate(cls) -> HTTPException:
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    @classmethod
    async def authenticate_user(cls, id: int, phone: int) -> Token:
        filter_query = FilterQuery(query=[
            DBQuery(key='id', opt='eq', value=id),
            DBQuery(key='phone', opt='eq', value=phone)
        ])

        teacher: TeacherModel.table = TeacherModel.find(filter_query=filter_query, limit=1, to_dict=False)

        if not teacher:
            raise cls.error_authenticate()

        return cls.create_token(id)

    @classmethod
    def validate_token(cls, token: str) -> TeacherModel.table:
        try:
            payload = jwt.decode(token, conf.JWT_SECRET, algorithms=[conf.JWT_ALGORITHM])
            _id = payload.get("id")
            teacher: TeacherModel.table = TeacherModel.get_by_id(_id=_id)
            return teacher

        except (JWTError, Exception):
            raise cls.error_authenticate()

    @classmethod
    def create_token(cls, _id: int) -> Token:
        now = datetime.utcnow()
        payload = {
            "iat": now,
            "nbf": now,
            "exp": now + timedelta(seconds=int(conf.JWT_EXP)),
            "id": _id,
        }
        token = jwt.encode(payload, conf.JWT_SECRET, algorithm=conf.JWT_ALGORITHM)
        return Token(access_token=token, id=_id)


auth_service = AuthService()
