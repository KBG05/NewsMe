from better_profanity import profanity
from app.schemas.user import UserCreate
from fastapi import HTTPException, status

def profanity_check(user:UserCreate):
    profanity.load_censor_words()
    if profanity.contains_profanity(user.topic_of_interest):
        return False
    for i in user.keywords:
        if profanity.contains_profanity(i):
            return False
    return True