from sqlalchemy import Column, Integer, UUID, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from uuid import uuid4
from datetime import datetime, timezone

Base=declarative_base()
class UsersInDB(Base):
    __tablename__="users"
    id=Column("id", UUID(as_uuid=True), default=uuid4, primary_key=True, index=True)
    email=Column("email", String, nullable=False, index=True)
    name=Column("name", String, )
    topic_of_interest=Column("topic_of_interest", String)
    frequency=Column("frequency", String)
    created_at=Column("created_at", DateTime, default=datetime.now(timezone.utc))
    last_sent_at=Column("last_sent_at", DateTime, default=datetime.now(timezone.utc))
    



    