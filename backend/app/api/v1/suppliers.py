from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.supplier import Supplier
from app.api.v1.auth import get_current_client_company

router = APIRouter(prefix="/suppliers", tags=["Suppliers"])


@router.get("")
def get_suppliers(
    db: Session = Depends(get_db),
    current_company=Depends(get_current_client_company)
):
    suppliers = (
        db.query(Supplier)
        .filter(Supplier.client_company_id == current_company.id)
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