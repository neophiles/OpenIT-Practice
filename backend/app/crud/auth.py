from sqlmodel import Session, select
from app.models.users import User
from app.db.database import get_session
from app.utils.auth import hash_password, verify_password

# Create a new user
def create_user(username: str, email: str, password: str, session: Session) -> User:
    user_exists = session.exec(
        select(User).where((User.username == username) | (User.email == email))
    ).first()
    if user_exists:
        return None

    user = User(username=username, email=email, password=hash_password(password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
