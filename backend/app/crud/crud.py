from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi import HTTPException, status
from app.schemas.user import UserCreate, UserDelete
from app.models import UsersInDB

def get_user(email:str, session:Session):
    existing=session.execute(select(UsersInDB).where(UsersInDB.email==email)).first()
    return existing

def add_user(user:UserCreate, session:Session):
    existing=session.execute(select(UsersInDB).where(UsersInDB.email==user.email)).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="user already exists")
    data=user.model_dump()
    data_to_db=UsersInDB(**data)
    session.add(data_to_db)
    session.commit()
    session.refresh(data_to_db)
    return True
 
def remove_user(email:str, session:Session):
    existing=session.execute(select(UsersInDB).where(UsersInDB.email==email)).scalars().first()
    if(not existing):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    session.delete(existing)
    session.commit()
    return True
    
       