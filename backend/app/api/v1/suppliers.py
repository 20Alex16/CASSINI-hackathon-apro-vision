from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.client_company import ClientCompany
from app.models.supplier import Supplier

router = APIRouter(prefix="/suppliers", tags=["Suppliers"])


@router.get("")
def get_suppliers(db: Session = Depends(get_db)):
    company = db.query(ClientCompany).first()

    if company is None:
        raise HTTPException(status_code=404, detail="No client company found")

    suppliers = (
        db.query(Supplier)
        .filter(Supplier.client_company_id == company.id)
        .all()
    )

    return [
        {
            "id": supplier.id,
            "name": supplier.name,
            "country": supplier.country,
            "sector": supplier.sector
        }
        for supplier in suppliers
    ]