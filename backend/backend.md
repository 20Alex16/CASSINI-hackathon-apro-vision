primul commit

task:
Backend -> sa fie API
Ce fel de date le folosim
In ce fel le vom transmite (in functie de request)
Cum validam datele 

Evolutia poluarii in timp
Compania reuseste sa diminueze
o lista -> nivele de poluare asociate a diferite companii pe anumite 
indice de poluare
furnizor -> locatii -> indice de poluare (say 1 to 10 / score etc -> cat de buna este compania)

coordanate
clientul isi pune toti furnizorii + locatie
identificat ape din imprejurimi -> si alea vedem cat ar fi de poluate

ce fel de scor vom folosi, cum il vom calcula, cum il atribuim daca o companie are mai multi furnizori (max din locatie separat)

cautam sa identificam maximul : per fiecare fabrica. un distribuitor poate sa aiba mai multe fabrici -> fiecare contribuie la decizia finala pentru a spune daca distribuitorul este riscant.

Vrem in engleza


FastAPI
PostgreSQL
SQLAlchemy
Alembic
Pydantic
Earth Engine API



ClientCompany
    ↓
requests intelligence about
    ↓
Supplier
    ↓
has one or more
    ↓
SupplierLocation
    ↓
each location gets
    ↓
PollutionAnalysis
    ↓
contains
    ↓
PollutionTimeSeries + Anomalies + Risk Explanation


python -m pip install --upgrade pip setuptools wheel
python -m pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic pydantic python-dotenv earthengine-api pandas numpy pytest


1. Acceptăm că Sentinel-2 nu are date utile zilnic.
2. Facem timeseries pe intervale de 7 zile.
3. Filtrăm norii mai relaxat: max 40%.
4. Dacă nu găsim imagine validă, nu salvăm punctul.
5. Graficul primește doar date reale.