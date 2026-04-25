from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.client_companies import router as client_companies_router
from app.api.v1.suppliers import router as suppliers_router
from app.api.v1.supplier_locations import router as supplier_locations_router
from app.api.v1.evaluations import router as evaluations_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(client_companies_router)
api_router.include_router(suppliers_router)
api_router.include_router(supplier_locations_router)
api_router.include_router(evaluations_router)