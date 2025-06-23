from pydantic import BaseModel, EmailStr, field_validator
from typing  import Annotated, List
from uuid import UUID
import enum

class Frequency(str, enum.Enum):
    DAILY='daily'
    WEEKLY="weekly"

class UserBase(BaseModel):
    pass

class UserCreate(UserBase):
    email:EmailStr
    name:str
    topic_of_interest:str
    keywords:List[str]
    @field_validator('keywords', mode='before')
    @classmethod
    def split_keywords(cls, v):
        if isinstance(v, str):
            # Split by comma and clean up
            return [keyword.strip() for keyword in v.split(',') if keyword.strip()]
        return v if isinstance(v, list) else []
    
    
class UserDelete(UserBase):
    email:EmailStr

class UserResponseMessage(BaseModel):
    msg:str
