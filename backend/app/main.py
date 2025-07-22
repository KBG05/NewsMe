from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.routers import user
from config import FRONTEND_URL_2, FRONTEND_URL, FRONTEND_URL_3
from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from fastapi.middleware.cors import CORSMiddleware


limiter = Limiter(key_func=get_remote_address)

app= FastAPI()

origins = [
    FRONTEND_URL,              # Main frontend URL
    FRONTEND_URL_2,            # Additional frontend URL
    FRONTEND_URL_3,            # Another additional frontend URL
    
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