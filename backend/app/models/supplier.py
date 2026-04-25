import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    client_company_id = Column(
        String,
        ForeignKey("client_companies.id"),
        nullable=False
    )

    name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    sector = Column(String, nullable=False, default="fashion")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    client_company = relationship("ClientCompany", back_populates="suppliers")

    locations = relationship(
        "SupplierLocation",
        back_populates="supplier",
        cascade="all, delete-orphan"
    )