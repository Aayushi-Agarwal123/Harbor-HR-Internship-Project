from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from .database import get_db
from .models import SessionToken, User

COOKIE = "harbor_session"


def current_user(request: Request, db: Session = Depends(get_db)) -> User:
    token = request.cookies.get(COOKIE)
    if not token:
        raise HTTPException(status_code=401, detail="Authentication is required.")
    row = db.query(SessionToken).filter(SessionToken.token == token).one_or_none()
    if row is None:
        raise HTTPException(status_code=401, detail="Authentication is required.")
    return row.user
