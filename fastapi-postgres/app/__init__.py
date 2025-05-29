from fastapi import FastAPI, HTTPException, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic.error_wrappers import ValidationError
from starlette.responses import RedirectResponse

from app.routers import router
from common.config import conf


def create_app(docs=False) -> FastAPI:
    app = (
        FastAPI(title=conf.SERVER_NAME)
        if docs
        else FastAPI(title=conf.SERVER_NAME, docs_url=None, redoc_url=None)
    )
    if docs:

        @app.get("/")
        async def root():
            return RedirectResponse(url="/docs")

    app.include_router(router)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.exception_handler(HTTPException)
    async def validation_exception_handler(request, exc: HTTPException):
        return JSONResponse(
            content=dict(message=f"error in response value {exc.detail}"),
            status_code=exc.status_code,
        )

    @app.exception_handler(ValidationError)
    async def validation_exception_handler(request, exc: ValidationError):
        return JSONResponse(
            content=dict(message=f"error in response value {exc}"),
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request, exc: RequestValidationError):
        return JSONResponse(
            content=dict(message=f"{exc}"),
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    return app
