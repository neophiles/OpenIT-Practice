from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    password: str
    email: EmailStr

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    middle_name:  Optional[str] = None
    last_name:  Optional[str] = None
    gender:  Optional[str] = None

class UserRead(BaseModel):
    id: int
    username: str
    password: str
    email: str
    first_name: Optional[str] = None
    middle_name:  Optional[str] = None
    last_name:  Optional[str] = None
    gender:  Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str