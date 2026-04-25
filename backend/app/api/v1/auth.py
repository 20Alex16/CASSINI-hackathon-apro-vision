from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.config import (
    SECRET_KEY,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    JWT_ALGORITHM,
)
from app.models.client_company import ClientCompany

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=JWT_ALGORITHM
    )


@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    company_name = data.get("company_name")
    password = data.get("password")

    if company_name is None or password is None:
        raise HTTPException(
            status_code=400,
            detail="company_name and password are required"
        )

    company = (
        db.query(ClientCompany)
        .filter(ClientCompany.company_name == company_name)
        .first()
    )

    if company is None or not verify_password(password, company.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": company.id})

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


def get_current_client_company(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[JWT_ALGORITHM]
        )

        company_id = payload.get("sub")

        if company_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    company = (
        db.query(ClientCompany)
        .filter(ClientCompany.id == company_id)
        .first()
    )

    if company is None:
        raise HTTPException(status_code=401, detail="User not found")

    return company