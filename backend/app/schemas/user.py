from pydantic import BaseModel
from typing  import Annotated
from uuid import UUID
import enum

class Frequency(str, enum.Enum):
    DAILY='daily'
    WEEKLY="weekly"

class UserBase(BaseModel):
    pass

class UserCreate(UserBase):
    email:str
    name:str
    topic_of_interest:str
    frequency:Frequency
    
class UserDelete(UserBase):
    email:str
      
class UserResponseMessage(BaseModel):
    msg:str
