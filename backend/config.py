import  os
from dotenv import load_dotenv
from sqlalchemy import URL
from typing import Any
load_dotenv()

DATABASE_URL:Any=os.getenv("DATABASE_URL") #type
SUPABASE_URL:str=os.getenv("SUPABASE_URL") #type: ignore
SUPABASE_KEY:str=os.getenv("SUPABASE_KEY")#type: ignore
REDIRECT_URL:str=os.getenv("http://localhost:8000/")#type: ignore
FRONTEND_URL:str=os.getenv("FRONTEND_URL")#type: ignore
FRONTEND_URL_2:str=os.getenv("FRONTEND_URL_2")#type: ignore
FRONTEND_URL_3:str=os.getenv("FRONTEND_URL_3")#type: ignore