from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import current_user
from ..models import Report, User

router = APIRouter(prefix="/api/reports", tags=["reports"])


@router.get("")
def list_reports(db: Session = Depends(get_db), user: User = Depends(current_user)):
    del user
    rows = db.query(Report).order_by(Report.id).all()
    return [{"id": row.id, "name": row.name} for row in rows]
