from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.db.database import get_session
from app.schemas.users import UserUpdate, UserRead
from app.crud.users import update_user
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.patch("/me", response_model=UserRead)
def update_my_profile(
    user_update: UserUpdate,
    current_user=Depends(get_current_user),
    session: Session = Depends(get_session),
):
    updated_user = update_user(current_user["id"], user_update, session)
    if not updated_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return updated_user