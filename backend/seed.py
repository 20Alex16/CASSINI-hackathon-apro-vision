from datetime import date
from uuid import uuid4

from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.client_company import ClientCompany
from app.models.supplier import Supplier
from app.models.supplier_location import SupplierLocation
from app.models.location_evaluation import LocationEvaluation

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def seed():
    db: Session = SessionLocal()

    print("🧹 Cleaning database...")

    db.query(LocationEvaluation).delete()
    db.query(SupplierLocation).delete()
    db.query(Supplier).delete()
    db.query(ClientCompany).delete()
    db.commit()

    print("🌱 Seeding data...")

    # =========================
    # COMPANY
    # =========================
    company = ClientCompany(
        id=str(uuid4()),
        company_name="zara",
        display_name="Zara",
        password_hash=pwd_context.hash("secret123"),
        sector="fashion"
    )
    db.add(company)
    db.commit()

    # =========================
    # SUPPLIERS (IMPORTANT: client_company_id)
    # =========================
    supplier1 = Supplier(
        id=str(uuid4()),
        client_company_id=company.id,
        name="Somes Textile Supplier",
        country="Romania",
        sector="fashion"
    )

    supplier2 = Supplier(
        id=str(uuid4()),
        client_company_id=company.id,
        name="Eco Fabric Plant",
        country="Turkey",
        sector="fashion"
    )

    db.add_all([supplier1, supplier2])
    db.commit()

    # =========================
    # LOCATIONS
    # =========================
    location1 = SupplierLocation(
        id=str(uuid4()),
        supplier_id=supplier1.id,
        name="Somesul Mic Facility",
        lat=46.77315,
        lng=23.585549
    )

    location2 = SupplierLocation(
        id=str(uuid4()),
        supplier_id=supplier2.id,
        name="Istanbul Fabric Hub",
        lat=41.0082,
        lng=28.9784
    )

    db.add_all([location1, location2])
    db.commit()

    # =========================
    # EVALUATIONS
    # =========================

    def make_eval(loc, start, end, ndwi, pollution, risk):
        return LocationEvaluation(
            id=str(uuid4()),
            location_id=loc.id,
            start_date=start,
            end_date=end,
            buffer_meters=500,
            ndwi_mean=ndwi,
            water_detected=ndwi > -0.2 if ndwi is not None else False,
            pollution_index=pollution,
            risk_level=risk,
            thumbnail_url=None,
            message="Seed generated data"
        )

    evaluations = [

        # LOCATION 1
        make_eval(location1, date(2023, 1, 1), date(2023, 1, 8),  -0.14, 80, "HIGH"),
        make_eval(location1, date(2023, 1, 8), date(2023, 1, 15),  0.01, 55, "MEDIUM"),
        make_eval(location1, date(2023, 1, 22), date(2023, 1, 29), -0.36, 80, "HIGH"),
        make_eval(location1, date(2023, 2, 5), date(2023, 2, 12),  -0.10, 80, "HIGH"),
        make_eval(location1, date(2023, 2, 12), date(2023, 2, 19), -0.16, 80, "HIGH"),
        make_eval(location1, date(2023, 2, 19), date(2023, 2, 26), -0.40, 80, "HIGH"),
        make_eval(location1, date(2023, 3, 12), date(2023, 3, 19), -0.30, 80, "HIGH"),
        make_eval(location1, date(2023, 3, 19), date(2023, 3, 26), -0.38, 80, "HIGH"),
        make_eval(location1, date(2023, 4, 23), date(2023, 4, 30), -0.35, 80, "HIGH"),
        make_eval(location1, date(2023, 4, 30), date(2023, 5, 7),  -0.37, 80, "HIGH"),
        make_eval(location1, date(2023, 5, 21), date(2023, 5, 28), -0.40, 80, "HIGH"),

        # LOCATION 2
        make_eval(location2, date(2023, 1, 1), date(2023, 1, 8),  -0.20, 40, "LOW"),
        make_eval(location2, date(2023, 2, 1), date(2023, 2, 8),  -0.35, 70, "HIGH"),
        make_eval(location2, date(2023, 3, 1), date(2023, 3, 8),  -0.28, 60, "MEDIUM"),
    ]

    db.add_all(evaluations)
    db.commit()

    db.close()

    print("✅ Seed completed successfully!")
    print("👉 Login:")
    print("   company_name = zara")
    print("   password     = secret123")


if __name__ == "__main__":
    seed()