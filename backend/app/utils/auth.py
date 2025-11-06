from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import secrets

SECRET_KEY = secrets.token_hex(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _trim(password: str) -> str:
    # bcrypt only uses first 72 bytes; slice to avoid ValueError
    return password.encode("utf-8")[:72].decode("utf-8", errors="ignore")

def hash_password(password: str) -> str:
    return pwd_context.hash(_trim(password))

def verify_password(plain_password: str, hashed_password: str) -> bool:
     return pwd_context.verify(_trim(plain_password), hashed_password)

def create_access_token(data: dict, expires_delta: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None