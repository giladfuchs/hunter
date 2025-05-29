from enum import Enum


class EnumBase(str, Enum):
    def __get__(self, instance, ownerclass=None):
        if instance is None:
            return self.value

    @classmethod
    def values(cls):
        return [_.value for _ in cls]


class Grade(EnumBase):
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    E = "E"
    F = "F"
    G = "G"
    H = "H"
    I = "I"
    J = "J"
    K = "K"
    L = "L"
