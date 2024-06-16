from fastapi import APIRouter
from misc.misc import get_project

router = APIRouter()

@router.get('/get')
def ping():
    return {"data" : get_project()}