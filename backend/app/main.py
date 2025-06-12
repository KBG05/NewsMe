from fastapi import FastAPI, Request
from app.routers import user
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app= FastAPI()

app.include_router(user.router)