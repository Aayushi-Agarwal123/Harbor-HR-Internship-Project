from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import COOKIE, current_user
from ..models import SessionToken, User
from ..schemas import LoginIn, UserOut
from ..security import new_token, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=UserOut)
def login(payload: LoginIn, response: Response, db: Session = Depends(get_db)):
    if not payload.username.strip() or not payload.password:
        raise HTTPException(status_code=400, detail="Enter both username and password.")
    user = db.query(User).filter(User.username == payload.username.strip()).one_or_none()
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Those credentials were not recognized.")
    token = new_token()
    db.add(SessionToken(token=token, user_id=user.id))
    db.commit()
    response.set_cookie(COOKIE, token, httponly=True, samesite="lax", path="/")
    return UserOut(username=user.username, display_name=user.display_name)


@router.post("/logout")
def logout(
    response: Response,
    request: Request,
    request_user: User = Depends(current_user),
    db: Session = Depends(get_db),
):
    del request_user
    token = request.cookies.get(COOKIE)
    if token:
        db.query(SessionToken).filter(SessionToken.token == token).delete()
        db.commit()
    response.delete_cookie(COOKIE, path="/")
    return {"ok": True}


@router.get("/me", response_model=UserOut)
def me(user: User = Depends(current_user)):
    return UserOut(username=user.username, display_name=user.display_name)
