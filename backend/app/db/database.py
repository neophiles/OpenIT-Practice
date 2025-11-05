from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL)

def get_session():
    with Session(engine) as session:
        yield session

def init_db():
    from app.models.users import User 
    SQLModel.metadata.create_all(engine)