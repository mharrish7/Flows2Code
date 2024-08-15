from fastapi import APIRouter
from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import RedirectResponse
import requests
from jose import jwt
from starlette.requests import Request 
from ..sql import login_register
from ..config import IS_PROD, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


router = APIRouter()

@router.get("/api/login/google")
async def login_google():
    return {
        "url": f"https://accounts.google.com/o/oauth2/auth?response_type=code&client_id={GOOGLE_CLIENT_ID}&redirect_uri={GOOGLE_REDIRECT_URI}&scope=openid%20profile%20email&access_type=offline"
    }

@router.get("/user/callback")
async def auth_google(request: Request,code: str):
    token_url = "https://accounts.google.com/o/oauth2/token"
    data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    response = requests.post(token_url, data=data)
    access_token = response.json().get("access_token")
    user_info = requests.get("https://www.googleapis.com/oauth2/v1/userinfo", headers={"Authorization": f"Bearer {access_token}"})
    user = user_info.json()
    request.session['user'] = dict({ 
            "email" : user["email"],
            "picture" : user["picture"]
        })
    login_register(user["email"])
    return RedirectResponse("/flow")

@router.get('/api/user/get') 
def check(request:Request):
    email = request.session.get("user")
    if not email:
        return {"message": "Not logged in"}
    return {"email" : email["email"], "picture" : email["picture"]}

@router.get("/token")
async def get_token(token: str = Depends(oauth2_scheme)):
    return jwt.decode(token, GOOGLE_CLIENT_SECRET, algorithms=["HS256"])