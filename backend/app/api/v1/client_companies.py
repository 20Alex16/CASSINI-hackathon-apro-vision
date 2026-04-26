from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.client_company import ClientCompany

router = APIRouter(prefix="/client-companies", tags=["Client Companies"])


@router.get("/me")
def get_me(db: Session = Depends(get_db)):
    company = db.query(ClientCompany).first()

    if company is None:
        raise HTTPException(status_code=404, detail="No client company found")

    return {
        "id": company.id,
        "company_name": company.company_name,
        "sector": company.sector
    }