import uuid
from sqlalchemy import Column, String, DateTime, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class ClientCompany(Base):
    __tablename__ = "client_companies"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    company_name = Column(String, unique=True, nullable=False)
    display_name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    sector = Column(String, nullable=False, default="fashion")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    suppliers = relationship(
        "Supplier",
        back_populates="client_company",
        cascade="all, delete-orphan"
    )