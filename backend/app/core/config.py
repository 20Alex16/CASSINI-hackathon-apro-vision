import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
GEE_PROJECT_ID = os.getenv("GEE_PROJECT_ID")
MAX_CLOUD_PERCENTAGE = int(os.getenv("MAX_CLOUD_PERCENTAGE", "40"))

if DATABASE_URL is None:
    raise RuntimeError("DATABASE_URL is missing from .env")

if SECRET_KEY is None:
    raise RuntimeError("SECRET_KEY is missing from .env")

if GEE_PROJECT_ID is None:
    raise RuntimeError("GEE_PROJECT_ID is missing from .env")