from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy import create_engine, Engine, URL
from config import DATABASE_URL
from typing import Any

DATABASE_URL: Any=DATABASE_URL
engine:Engine=create_engine(DATABASE_URL)

def get_session():
    SessionLocal=sessionmaker(bind=engine, autoflush=False) 
    with SessionLocal() as session:
        yield session


    
