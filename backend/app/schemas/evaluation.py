from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, Field


class EvaluationCreate(BaseModel):
    start_date: date
    end_date: date
    buffer_meters: int = Field(default=500, ge=100, le=5000)


class EvaluationResponse(BaseModel):
    id: str
    location_id: str
    start_date: date
    end_date: date
    buffer_meters: int
    ndwi_mean: Optional[float]
    water_detected: bool
    pollution_index: int
    risk_level: str
    thumbnail_url: Optional[str]
    message: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class EvaluationChartPoint(BaseModel):
    date: date
    pollution_index: int
    ndwi_mean: Optional[float]
    risk_level: str