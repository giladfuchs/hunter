from enum import Enum


class Cdict(dict):
    @property
    def id(self):
        return self.get('id')


class EnumBase(str, Enum):
    def __get__(self, instance, ownerclass=None):
        if instance is None:
            return self.value
