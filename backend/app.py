from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from pydantic import BaseModel
from .views import home,tasks


app = FastAPI()
origins = [
    "*"
]

templates = Jinja2Templates(directory="./frontend/dist")

# Mounts the `static` folder within the `build` folder to the `/static` route.
app.mount('/assets', StaticFiles(directory="./frontend/dist/assets"), 'assets')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#Startup


@app.get("/api/test")
def first_example():
      return {"ping": "pong"}

class Item(BaseModel):
    name: str
    description: str

@app.post("/api/items/", response_model=Item)
async def create_item(item: Item):
    return item

app.include_router(home.router, prefix = "/api/home",tags=["Home"])
app.include_router(tasks.router, prefix = "/api/tasks",tags=["Tasks"])

@app.post("/gen")
async def get_body(request: Request):
    print(await request.json())
    return await request.json()

@app.get("/{rest_of_path:path}")
def react_app(req: Request, rest_of_path: str):
    return templates.TemplateResponse('index.html', { 'request': req })


