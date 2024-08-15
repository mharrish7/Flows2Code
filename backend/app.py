from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
from pydantic import BaseModel
from .views import home,tasks,auth
from .gem import query
from .sql import increment,createTables,get_count
from starlette.middleware.sessions import SessionMiddleware 
from starlette.requests import Request 
from fastapi.responses import RedirectResponse

app = FastAPI()
origins = [
    "*"
]

templates = Jinja2Templates(directory="./frontend/dist")

# Mounts the `static` folder within the `build` folder to the `/static` route.
app.mount('/assets', StaticFiles(directory="./frontend/dist/assets"), 'assets')
app.add_middleware(SessionMiddleware ,secret_key='outofideas') 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#Startup

createTables()

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
app.include_router(auth.router, prefix = "",tags=["Auth"])

@app.get("/api/count")
def count():
    return {'count' : get_count()}

def get_context(node,edges,nodes):
    deps = []
    for edge in edges:
        if edge["target"] == node:
            deps.append(edge["source"])
    result = ""
    for node in nodes:
        if node["data"]["label"] in deps:
            result += node["data"]["outputs"] + "\n"
    return result

def filter_code(code):
    if "```" in code:
        ind1 = code.index("\n")
        code = code[ind1:]
        if "```" in code:
            ind2 = code.index("```")
            code = code[:ind2]
    code = code.strip()
    return code

@app.post("/gen")
async def get_body(request: Request):
    req = await request.json()
    nodes = req['nodes']
    node = req['node']
    edges = req['edges'] 
    prompt = node["text"]
    increment(request.session.get("user")["email"])
    deps = get_context(node["label"],edges,nodes)
    code = query(deps,prompt, req["lang"])
    code = filter_code(code)
    return {"data" : code, "node" : node["label"]}

@app.get("/{rest_of_path:path}")
def react_app(req: Request, rest_of_path: str):
    allowed_routes = ["login",""]
    if rest_of_path not in allowed_routes:
        if req.session.get('user') == None:
            return RedirectResponse("/login")
    return templates.TemplateResponse('index.html', { 'request': req })


