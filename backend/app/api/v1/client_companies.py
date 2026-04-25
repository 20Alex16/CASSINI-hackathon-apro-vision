from fastapi import APIRouter, Depends

from app.api.v1.auth import get_current_client_company

router = APIRouter(prefix="/client-companies", tags=["Client Companies"])


@router.get("/me")
def get_me(current_company=Depends(get_current_client_company)):
    return {
        "id": current_company.id,
        "company_name": current_company.company_name,
        "sector": current_company.sector
    }