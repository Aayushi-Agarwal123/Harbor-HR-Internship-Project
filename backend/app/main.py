import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from .database import Base, SessionLocal, engine
from .routers import auth, employees, records, reports, timesheets, workflow
from .seed import seed

app = FastAPI(title="Harbor HR", version="0.2.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(reports.router)
app.include_router(timesheets.router)
app.include_router(records.leave_router)
app.include_router(records.candidate_router)
app.include_router(records.review_router)
app.include_router(records.claim_router)
app.include_router(workflow.profile_router)
app.include_router(workflow.vacancy_router)
app.include_router(workflow.tracker_router)
app.include_router(workflow.buzz_router)
app.include_router(workflow.maintenance_router)


@app.on_event("startup")
def startup():
    if os.environ.get("HARBOR_RESET") == "1":
        Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed(db)
    finally:
        db.close()


@app.get("/api/health")
def health():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    return {"ok": True, "database": engine.url.render_as_string(hide_password=True)}
