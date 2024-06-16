from fastapi import APIRouter


router = APIRouter()

@router.get('/get')
def ping():
    return {"data" : "tasks"}