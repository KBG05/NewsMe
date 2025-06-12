from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.routers import user
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from fastapi.middleware.cors import CORSMiddleware

limiter = Limiter(key_func=get_remote_address)

app= FastAPI()

origins = [
    "http://localhost:8080",
    "https://localhost:8080",  # If you use HTTPS locally
    "http://127.0.0.1:8080",   # Alternative localhost format
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

# Custom error handler for rate limits
@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many subscription requests. Please try again later."}
    )

app.include_router(user.router)