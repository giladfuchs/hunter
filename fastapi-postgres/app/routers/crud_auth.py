from typing import List, Type, Union

from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse

from common.db_model import DBModel
from common.serializers import FilterQuery
from service.auth import jwt_required, user_filtered_query


def generate_crud_auth_routes(model: Type[DBModel], prefix: str):
    router = APIRouter(prefix=prefix, tags=[prefix.strip("/")])

    @router.post("", response_model=List[model.table])
    async def fetch_rows(
        filter_query: FilterQuery = user_filtered_query(),
    ) -> Union[List[model.table], JSONResponse]:
        rows = model.fetch_rows(filter_query=filter_query, to_dict=False)
        if filter_query.relation_model:
            return JSONResponse(content=rows)
        else:
            return rows

    @router.delete("")
    async def delete_rows(
        filter_query: FilterQuery = user_filtered_query(),
    ):
        return model.delete_rows(filter_query=filter_query)

    @router.post("/{add_or_id}")
    async def add_or_update(
        add_or_id: str, body: model.table, user_auth=Depends(jwt_required)
    ):
        model.add_or_find_update(add_or_id=add_or_id, body=body, user_auth=user_auth)
        return True

    return router


# curl 'http://0.0.0.0:5001/student' \
#   -X 'POST' \
#   -H 'Accept: application/json, text/plain, */*' \
#   -H 'Accept-Language: en-US,en;q=0.9,es-US;q=0.8,es-CO;q=0.7,es;q=0.6,he-IL;q=0.5,he;q=0.4' \
#   -H 'Access-Control-Expose-Headers: Access-Token' \
#   -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NDg0NDIzOTAsIm5iZiI6MTc0ODQ0MjM5MCwiZXhwIjoxNzQ4NDQ1OTkwLCJpZCI6Mn0.-bcQ8WUvijMMc1j-8T0o0aAwj_CUjq11XLhwVw5Vlkg' \
#   -H 'Connection: keep-alive' \
#   -H 'Content-Length: 0' \
#   -H 'Origin: http://localhost:3030' \
#   -H 'Referer: http://localhost:3030/' \
#   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36' \
#   --insecure
