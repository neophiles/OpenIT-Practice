from sqlmodel import Session, select
from app.models.users import User
from app.utils.auth import hash_password

def update_user(user_id: int, user_update_data, session: Session):
    user = session.get(User, user_id)
    if not user:
        return None

    # Exclude unset fields (only update what’s sent)
    update_data = user_update_data.model_dump(exclude_unset=True) 

    # Handle password (rehash before saving)
    if "password" in update_data:
        update_data["password"] = hash_password(update_data.pop("password"))

    for key, value in update_data.items():
        setattr(user, key, value)

    session.add(user)
    session.commit()
    session.refresh(user)
    return user