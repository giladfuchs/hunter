from enum import Enum
from typing import Optional, List, Any

from pydantic import BaseModel
from sqlmodel import SQLModel, Field

from common.enums import EnumBase


def parse_value_to_json(value):
    if isinstance(value, EnumBase) or isinstance(value, Enum):
        return value.value
    return value


class BaseModelUtil(BaseModel):
    def dict(self, *args, **kwargs):
        # if kwargs and kwargs.get("exclude_none") is not None:
        kwargs["exclude_none"] = True
        return BaseModel.dict(self, *args, **kwargs)

    def to_json(self, *args, **kwargs) -> dict:
        kwargs["exclude_none"] = True
        json_dict = BaseModel.dict(self, *args, **kwargs)
        json_dict: dict = {key: parse_value_to_json(value) for key, value in json_dict.items()}
        return json_dict


class BaseTable(SQLModel):
    def dict(self, *args, **kwargs):
        if not kwargs or kwargs.get("exclude_none") is None:
            kwargs["exclude_none"] = True
        return SQLModel.dict(self, *args, **kwargs)


class IdBaseTable(BaseTable):
    id: Optional[int] = Field(default=None, primary_key=True)

    def __hash__(self):
        return hash(self.id)

    def __eq__(self, other):
        if isinstance(other, self.__class__):
            return self.id == other.id
        else:
            return other == self.id


class DBQuery(BaseModelUtil):
    opt: str
    key: str
    value: Any


class FilterQuery(BaseModelUtil):
    query: List[DBQuery] = []
    relation_model = False
    flags: Optional[List[str]] = []


class Token(BaseModel):
    access_token: str
    id: int
