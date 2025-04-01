
from fastapi import APIRouter



from common.db_model.models import TeacherModel

router = APIRouter(prefix="/teacher", tags=["teacher"])

router.add_api_route(
    "/filter",
    TeacherModel._get_all( ),
    methods=["POST"],
    summary="Filter",
)
router.add_api_route(
    "/{add_or_id}",
    TeacherModel._add_update_callable(),
    methods=["POST"],
    summary="add_or_edit",
)