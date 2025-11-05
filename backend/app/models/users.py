from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str
    password: str
    email: str
    first_name: str
    middle_name: str
    last_name: str
    gender: str