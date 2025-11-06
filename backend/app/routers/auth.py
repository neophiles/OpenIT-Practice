from fastapi import APIRouter, FastAPI, Depends, status
from sqlmodel import Session
from app.db.database import get_session 
from app.schemas.users import UserCreate, UserRead
from app.crud.auth import create_user   


router = APIRouter(prefix="/user", tags=["users"])

@router.post("/register", response_model=UserRead)
def user_register(user: UserCreate, session: Session = Depends(get_session)):
    return create_user(session, user)

    
    
    

    
