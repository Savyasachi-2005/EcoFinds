
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import db, auth
from app.schemas import schemas
from app.models import models

router = APIRouter()

@router.post("/", response_model=schemas.Item)
def create_item(
    item: schemas.ItemCreate,
    db: Session = Depends(db.get_db),
    current_user: models.User = Depends(auth.get_current_active_user),
):
    new = models.Item(
        title=item.title,
        category=item.category,
        eco_score=item.eco_score,
        user_id=current_user.id,
    )
    db.add(new)
    db.commit()
    db.refresh(new)
    return new

@router.get("/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(db.get_db)):
    # Exclude legacy rows inserted without a user (user_id IS NULL)
    return (
        db.query(models.Item)
        .filter(models.Item.user_id.isnot(None))
        .offset(skip)
        .limit(limit)
        .all()
    )
