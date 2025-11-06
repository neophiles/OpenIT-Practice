from fastapi import APIRouter, Depends, HTTPException, status
from app.crud.auth import create_user
from app.schemas.users import UserCreate
from app.utils.auth import create_access_token
from app.db.database import get_session
from sqlmodel import Session

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register(user_data: UserCreate, session: Session = Depends(get_session)):
    user = create_user(user_data.username, user_data.email, user_data.password, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or email already exists")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}