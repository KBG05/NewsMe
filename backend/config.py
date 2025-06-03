import  os
from dotenv import load_dotenv
from sqlalchemy import URL
from typing import Any
load_dotenv()

DATABASE_URL:Any=os.getenv("DATABASE_URL")