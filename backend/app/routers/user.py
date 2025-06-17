from fastapi import APIRouter, status, HTTPException, Depends,Body, Request, Query
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from app.schemas.user import UserResponseMessage, UserCreate
from app.database import get_session
from app.crud.crud import add_user, remove_user, get_user
from pydantic import ValidationError
from typing import Annotated, List
from app.security import get_supabase_client
from supabase import Client
from config import REDIRECT_URL, FRONTEND_URL
from slowapi import Limiter
from slowapi.util import get_remote_address

router=APIRouter(tags=["user"])

limiter = Limiter(key_func=get_remote_address)

@router.post("/subscribe", response_model=UserResponseMessage, status_code=status.HTTP_201_CREATED)
@limiter.limit("3/minute")
def create_user(request:Request, user:Annotated[UserCreate, Body(embed=False)], supabase:Annotated[Client, Depends(get_supabase_client)], session:Session=Depends(get_session), ):
    try:
        existing=get_user(user.email, session=session)
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="user already registered")
        response=supabase.auth.sign_in_with_otp({
            "email":user.email,
            "options":{
                'should_create_user':True,
                'email_redirect_to':f"{REDIRECT_URL}",
                 'data': {  # Use 'data' not 'metadata'
                        'name': user.name,
                        'topic': user.topic_of_interest,
                        'keywords':user.keywords
                    }
            }
        })
        
        if response.user==None or (not existing)  :
            return UserResponseMessage(msg="Magic Link Sent Successfully")
        else:
            raise HTTPException(status_code=response.status, detail="user already registered")
        
    except ValidationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.delete("/unsubscribe/{email}", response_model=UserResponseMessage, status_code=status.HTTP_200_OK)
async def delete_user(email:str, supabase:Client=Depends(get_supabase_client) ,session:Session=Depends(get_session)):
    try:
        remove_user(email=email, session=session)
        # users_response=supabase.auth.admin.list_users()
        # print(users_response)
        # target=None
        # for users in users_response:
        #     if users.email==email:
        #         target=users
        #         break
        # if target:
        #     response=supabase.auth.admin.delete_user(target.id)
        return UserResponseMessage(msg="successfully unsubscribed to newsletter")            
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.get("/verify")
async def verify_user(request:Request, name:Annotated[str, Query()], keywords:Annotated[List[str], Query()], topic:Annotated[str, Query()], supabase:Annotated[Client, Depends(get_supabase_client)], session:Annotated[Session, Depends(get_session)]):
    token_hash=request.query_params.get("token_hash")
    type_param=request.query_params.get("type")
    
    if not token_hash or type_param!="email":
        return HTMLResponse("<h1>Invalid verification link </h1>")
    
    try:
        response=supabase.auth.verify_otp({
            "token_hash":token_hash,
            "type":type_param,
        })
        if response.user :
            verified_email=response.user.email
            db_data=UserCreate(email=str(verified_email), name=name, topic_of_interest=str(topic), keywords=keywords)
            add_user(session=session, user=db_data)
            
            return HTMLResponse(f"""
                <html>
        <head>
            <title>Email Verified</title>
        </head>
        <body>
            <h2>✅ Welcome {name}!</h2>
            <p>You're now subscribed to {topic} updates at {verified_email}</p>
            <p id="countdown">Redirecting to your dashboard in <span id="timer">3</span> seconds...</p>
            
            <script>
                let countdown = 3;
                const timer = document.getElementById('timer');
                const countdownElement = document.getElementById('countdown');
                
                const interval = setInterval(function() {{
                    countdown--;
                    timer.textContent = countdown;
                    
                    if (countdown <= 0) {{
                        clearInterval(interval);
                        countdownElement.innerHTML = 'Redirecting now...';
                        
                        try {{
                            // Try multiple redirect methods
                            if (window.location.replace) {{
                                window.location.replace('{FRONTEND_URL}');
                            }} else if (window.location.href) {{
                                window.location.href = '{FRONTEND_URL}';
                            }} else {{
                                window.location = '{FRONTEND_URL}';
                            }}
                        }} catch (error) {{
                            console.error('Redirect failed:', error);
                            countdownElement.innerHTML = '<a href="{FRONTEND_URL}">Click here to continue</a>';
                        }}
                    }}
                }}, 1000);
                
                // Fallback: redirect immediately if user clicks anywhere
                document.body.addEventListener('click', function() {{
                    clearInterval(interval);
                    window.location.href = '{FRONTEND_URL}';
                }});
            </script>
        </body>
    </html>
            """)
        else:
            return HTMLResponse("<h2> Email verification failed</h2>")
    except Exception as e:
        return  HTMLResponse(f"<h1>Error {str(e)}</h1> ")
    
    