from fastapi import APIRouter, status, HTTPException, Depends,Body, Request
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from app.schemas.user import UserResponseMessage, UserCreate
from app.database import get_session
from app.crud.crud import add_user, remove_user
from pydantic import ValidationError
from typing import Annotated
router=APIRouter(tags=["user"])



@router.post("/subscribe", response_model=UserResponseMessage, status_code=status.HTTP_201_CREATED)
def create_user(request:Request, user:Annotated[UserCreate, Body()], session:Session=Depends(get_session)):
    try:
        add_user(user=user, session=session)
        return UserResponseMessage(msg=f"{user.name} is added to newsletter")
    except ValidationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.delete("/unsubscribe/{email}", response_model=UserResponseMessage, status_code=status.HTTP_200_OK)
def delete_user(email:str, session:Session=Depends(get_session)):
    try:
        remove_user(email=email, session=session)
        return UserResponseMessage(msg="successfully unsubscribed to newsletter")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
