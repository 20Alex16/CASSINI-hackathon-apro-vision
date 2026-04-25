import uuid
from sqlalchemy import Column, String, Date, DateTime, Float, Integer, Boolean, ForeignKey, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class LocationEvaluation(Base):
    __tablename__ = "location_evaluations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    location_id = Column(
        String,
        ForeignKey("supplier_locations.id"),
        nullable=False
    )

    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    buffer_meters = Column(Integer, nullable=False, default=500)

    ndwi_mean = Column(Float, nullable=True)
    water_detected = Column(Boolean, nullable=False, default=False)

    pollution_index = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)

    thumbnail_url = Column(String, nullable=True)
    message = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    location = relationship("SupplierLocation", back_populates="evaluations")