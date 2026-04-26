from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.client_company import ClientCompany
from app.models.supplier import Supplier
from app.models.supplier_location import SupplierLocation
from app.models.location_evaluation import LocationEvaluation
from app.schemas.evaluation import (
    EvaluationCreate,
    EvaluationResponse,
    EvaluationChartPoint,
)
from app.services.satellite_evaluation_service import SatelliteEvaluationService

router = APIRouter(
    prefix="/suppliers",
    tags=["Evaluations"]
)

satellite_service = SatelliteEvaluationService()


def get_owned_location(
    supplier_id: str,
    location_id: str,
    db: Session
):
    company = db.query(ClientCompany).first()

    if company is None:
        raise HTTPException(status_code=404, detail="No client company found")

    supplier = (
        db.query(Supplier)
        .filter(
            Supplier.id == supplier_id,
            Supplier.client_company_id == company.id
        )
        .first()
    )

    if supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")

    location = (
        db.query(SupplierLocation)
        .filter(
            SupplierLocation.id == location_id,
            SupplierLocation.supplier_id == supplier.id
        )
        .first()
    )

    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")

    return supplier, location


@router.post(
    "/{supplier_id}/locations/{location_id}/evaluations",
    response_model=EvaluationResponse
)
def create_location_evaluation(
    supplier_id: str,
    location_id: str,
    payload: EvaluationCreate,
    db: Session = Depends(get_db)
):
    _, location = get_owned_location(
        supplier_id=supplier_id,
        location_id=location_id,
        db=db
    )

    result = satellite_service.evaluate_location(
        lat=location.lat,
        lng=location.lng,
        start_date=str(payload.start_date),
        end_date=str(payload.end_date),
        buffer_meters=payload.buffer_meters
    )

    pollution_index = result.get("pollution_index")
    ndwi_mean = result.get("ndwi_mean")
    risk_level = result.get("risk_level")

    if pollution_index is None or ndwi_mean is None or risk_level == "NO_DATA":
        raise HTTPException(
            status_code=422,
            detail=result.get("message", "No valid Sentinel-2 data found.")
        )

    existing_evaluation = (
        db.query(LocationEvaluation)
        .filter(
            LocationEvaluation.location_id == location.id,
            LocationEvaluation.start_date == payload.start_date,
            LocationEvaluation.end_date == payload.end_date
        )
        .first()
    )

    if existing_evaluation is not None:
        return existing_evaluation

    evaluation = LocationEvaluation(
        location_id=location.id,
        start_date=payload.start_date,
        end_date=payload.end_date,
        buffer_meters=payload.buffer_meters,
        ndwi_mean=ndwi_mean,
        water_detected=result.get("water_detected", False),
        pollution_index=pollution_index,
        risk_level=risk_level,
        thumbnail_url=result.get("thumbnail_url"),
        message=result.get("message")
    )

    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)

    return evaluation


@router.post(
    "/{supplier_id}/locations/{location_id}/evaluations/timeseries"
)
def create_timeseries_evaluation(
    supplier_id: str,
    location_id: str,
    payload: EvaluationCreate,
    db: Session = Depends(get_db)
):
    _, location = get_owned_location(
        supplier_id=supplier_id,
        location_id=location_id,
        db=db
    )

    current_date = payload.start_date
    end_date = payload.end_date

    created_points = []
    skipped_intervals = []

    while current_date < end_date:
        next_date = current_date + timedelta(days=7)

        if next_date > end_date:
            next_date = end_date

        result = satellite_service.evaluate_location(
            lat=location.lat,
            lng=location.lng,
            start_date=str(current_date),
            end_date=str(next_date),
            buffer_meters=payload.buffer_meters
        )

        pollution_index = result.get("pollution_index")
        ndwi_mean = result.get("ndwi_mean")
        risk_level = result.get("risk_level")

        if pollution_index is None or ndwi_mean is None or risk_level == "NO_DATA":
            skipped_intervals.append({
                "start_date": str(current_date),
                "end_date": str(next_date),
                "reason": result.get("message", "No valid Sentinel-2 data")
            })

            current_date = next_date
            continue

        existing_evaluation = (
            db.query(LocationEvaluation)
            .filter(
                LocationEvaluation.location_id == location.id,
                LocationEvaluation.start_date == current_date,
                LocationEvaluation.end_date == next_date
            )
            .first()
        )

        if existing_evaluation is not None:
            skipped_intervals.append({
                "start_date": str(current_date),
                "end_date": str(next_date),
                "reason": "Evaluation already exists for this interval."
            })

            current_date = next_date
            continue

        evaluation = LocationEvaluation(
            location_id=location.id,
            start_date=current_date,
            end_date=next_date,
            buffer_meters=payload.buffer_meters,
            ndwi_mean=ndwi_mean,
            water_detected=result.get("water_detected", False),
            pollution_index=pollution_index,
            risk_level=risk_level,
            thumbnail_url=result.get("thumbnail_url"),
            message=result.get("message")
        )

        db.add(evaluation)

        created_points.append({
            "start_date": str(current_date),
            "end_date": str(next_date),
            "pollution_index": pollution_index,
            "risk_level": risk_level,
            "ndwi_mean": ndwi_mean
        })

        current_date = next_date

    db.commit()

    return {
        "message": "Timeseries evaluation completed.",
        "created_points": len(created_points),
        "skipped_intervals": len(skipped_intervals),
        "points": created_points,
        "skipped": skipped_intervals
    }


@router.get(
    "/{supplier_id}/locations/{location_id}/evaluations",
    response_model=list[EvaluationResponse]
)
def get_location_evaluations(
    supplier_id: str,
    location_id: str,
    db: Session = Depends(get_db)
):
    _, location = get_owned_location(
        supplier_id=supplier_id,
        location_id=location_id,
        db=db
    )

    evaluations = (
        db.query(LocationEvaluation)
        .filter(LocationEvaluation.location_id == location.id)
        .order_by(LocationEvaluation.start_date.asc())
        .all()
    )

    return evaluations


@router.get(
    "/{supplier_id}/locations/{location_id}/evaluations/latest",
    response_model=EvaluationResponse
)
def get_latest_location_evaluation(
    supplier_id: str,
    location_id: str,
    db: Session = Depends(get_db)
):
    _, location = get_owned_location(
        supplier_id=supplier_id,
        location_id=location_id,
        db=db
    )

    evaluation = (
        db.query(LocationEvaluation)
        .filter(LocationEvaluation.location_id == location.id)
        .order_by(LocationEvaluation.created_at.desc())
        .first()
    )

    if evaluation is None:
        raise HTTPException(status_code=404, detail="No evaluations found")

    return evaluation


@router.get(
    "/{supplier_id}/locations/{location_id}/evaluations/chart",
    response_model=list[EvaluationChartPoint]
)
def get_location_evaluation_chart(
    supplier_id: str,
    location_id: str,
    db: Session = Depends(get_db)
):
    _, location = get_owned_location(
        supplier_id=supplier_id,
        location_id=location_id,
        db=db
    )

    evaluations = (
        db.query(LocationEvaluation)
        .filter(LocationEvaluation.location_id == location.id)
        .filter(LocationEvaluation.pollution_index.isnot(None))
        .filter(LocationEvaluation.ndwi_mean.isnot(None))
        .order_by(LocationEvaluation.start_date.asc())
        .all()
    )

    return [
        {
            "date": evaluation.start_date,
            "pollution_index": evaluation.pollution_index,
            "ndwi_mean": evaluation.ndwi_mean,
            "risk_level": evaluation.risk_level
        }
        for evaluation in evaluations
    ]