import os

from pydantic import BaseSettings

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class Settings(BaseSettings):
    SERVER_NAME: str = "Hunter"
    JWT_ALGORITHM: str = "HS256"
    JWT_SECRET: str = "JWT_ALGORITHM-SECRET"
    JWT_EXP: int = 3600
    POSTGRES_DATABASE_URL = "postgresql://admin:admin@db:5432/postgres"

    # POSTGRES_DATABASE_URL = "postgresql://admin:admin@0.0.0.0:5432/postgres"


conf = Settings()
