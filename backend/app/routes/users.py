from fastapi import APIRouter, Depends, Body
from sqlmodel import Session
from app.dependencies.auth import get_current_user
from app.db.database import get_session
from app.schemas.users import UserUpdate, UserRead
from app.crud.users import update_user
from app.models.users import User

router = APIRouter(prefix="/users", tags=["users"])

@router.put("/me")
def update_my_profile(
    user_update: UserUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    updated_user = update_user(current_user.id, user_update, session)
    return updated_user

@router.get("/me", response_model=UserRead)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserRead)
def patch_my_profile(
    user_update: dict = Body(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """
    Accepts partial updates as a JSON object. `user_update` is a dict
    containing only the fields to change (e.g. {"email": "..."}).
    """
    # convert to UserUpdate model so update_user can call model_dump(exclude_unset=True)
    user_update_model = UserUpdate(**user_update)
    updated_user = update_user(current_user.id, user_update_model, session)
    return updated_user