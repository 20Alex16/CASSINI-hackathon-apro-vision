import uuid
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class SupplierLocation(Base):
    __tablename__ = "supplier_locations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    supplier_id = Column(
        String,
        ForeignKey("suppliers.id"),
        nullable=False
    )

    name = Column(String, nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    supplier = relationship("Supplier", back_populates="locations")

    evaluations = relationship(
        "LocationEvaluation",
        back_populates="location",
        cascade="all, delete-orphan"
    )