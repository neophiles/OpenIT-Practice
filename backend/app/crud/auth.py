from sqlmodel import select, Session    
from app.models.users import User
from app.schemas.users import UserCreate, UserRead

def create_user(session: Session, user_data: UserCreate):
    user = User.from_orm(user_data)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
