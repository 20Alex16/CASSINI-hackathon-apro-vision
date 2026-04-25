from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.supplier import Supplier
from app.models.supplier_location import SupplierLocation
from app.api.v1.auth import get_current_client_company

router = APIRouter(prefix="/suppliers", tags=["Supplier Locations"])


@router.get("/{supplier_id}/locations")
def get_supplier_locations(
    supplier_id: str,
    db: Session = Depends(get_db),
    current_company=Depends(get_current_client_company)
):
    supplier = (
        db.query(Supplier)
        .filter(
            Supplier.id == supplier_id,
            Supplier.client_company_id == current_company.id
        )
        .first()
    )

    if supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")

    locations = (
        db.query(SupplierLocation)
        .filter(SupplierLocation.supplier_id == supplier.id)
        .all()
    )

    return [
        {
            "id": location.id,
            "supplier_id": location.supplier_id,
            "name": location.name,
            "lat": location.lat,
            "lng": location.lng
        }
        for location in locations
    ]