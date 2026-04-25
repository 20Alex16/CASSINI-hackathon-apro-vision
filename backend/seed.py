from passlib.context import CryptContext

from app.core.database import SessionLocal, Base, engine
from app.models.client_company import ClientCompany
from app.models.supplier import Supplier
from app.models.supplier_location import SupplierLocation

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def seed():
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    existing = (
        db.query(ClientCompany)
        .filter(ClientCompany.company_name == "zara")
        .first()
    )

    if existing:
        print("Seed already exists.")
        db.close()
        return

    company = ClientCompany(
        company_name="zara",
        display_name="Zara",
        password_hash=pwd_context.hash("secret123"),
        sector="fashion"
    )

    supplier = Supplier(
        name="Somes Textile Supplier",
        country="Romania",
        sector="fashion",
        client_company=company
    )

    location = SupplierLocation(
        name="Somesul Mic Facility",
        lat=46.773150,
        lng=23.585549,
        supplier=supplier
    )

    db.add(company)
    db.commit()

    print("Seed completed.")
    print("company_name: zara")
    print("password: secret123")

    db.close()


if __name__ == "__main__":
    seed()