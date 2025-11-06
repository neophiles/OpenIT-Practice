from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import init_db

from app.routers.auth import router

app = FastAPI()

# CORS Setup
origins = [
    "http://localhost:5173", # React + Vite
    "http://127.0.0.1:5173",
    # Add deployed frontend URLs here when needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # domains allowed to access the API
    allow_credentials=True,         # allow cookies or auth headers
    allow_methods=["*"],            # allow all HTTP methods
    allow_headers=["*"],            # allow all custom headers
)


app.include_router(router)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def home():
    return { "fastapi is running" }