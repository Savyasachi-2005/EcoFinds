
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app import db, auth
from app.schemas import schemas

router = APIRouter()

@router.post("/", response_model=schemas.Report)
def create_report(
    report: schemas.ReportCreate,
    db: Session = Depends(db.get_db),
    current_user = Depends(auth.get_current_active_user),
):
    from app.models.models import Report as ReportModel
    new_report = ReportModel(
        description=report.description,
        location=report.location,
        status="pending",
        user_id=current_user.id,
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report

@router.get("/", response_model=List[schemas.Report])
def read_reports(skip: int = 0, limit: int = 100, db: Session = Depends(db.get_db)):
    from app.models.models import Report as ReportModel
    return (
        db.query(ReportModel)
        .filter(ReportModel.user_id.isnot(None))
        .offset(skip)
        .limit(limit)
        .all()
    )
