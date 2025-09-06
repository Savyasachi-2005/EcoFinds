from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import db, auth
from app.models import models
from app.schemas import product as product_schema

router = APIRouter(prefix="/products", tags=["Products"])


@router.post("/", response_model=product_schema.ProductOut)
def create_product(
    payload: product_schema.ProductCreate,
    current_user: models.User = Depends(auth.get_current_active_user),
    session: Session = Depends(db.get_db),
):
    prod = models.Product(
        title=payload.title,
        description=payload.description or "",
        category=payload.category,
        price=payload.price,
        image_url=payload.image_url,
        owner_id=current_user.id,
    )
    session.add(prod)
    session.commit()
    session.refresh(prod)
    return prod


@router.get("/", response_model=List[product_schema.ProductOut])
def list_products(
    q: Optional[str] = Query(None, description="Keyword search in title/description"),
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    skip: int = 0,
    limit: int = 50,
    session: Session = Depends(db.get_db),
):
    query = session.query(models.Product)
    if q:
        like = f"%{q}%"
        query = query.filter((models.Product.title.ilike(like)) | (models.Product.description.ilike(like)))
    if category:
        query = query.filter(models.Product.category == category)
    if min_price is not None:
        query = query.filter(models.Product.price >= min_price)
    if max_price is not None:
        query = query.filter(models.Product.price <= max_price)
    return query.offset(skip).limit(min(limit, 100)).all()


@router.get("/{product_id}", response_model=product_schema.ProductOut)
def get_product(product_id: int, session: Session = Depends(db.get_db)):
    prod = session.query(models.Product).get(product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    return prod


@router.put("/{product_id}", response_model=product_schema.ProductOut)
def update_product(
    product_id: int,
    payload: product_schema.ProductUpdate,
    current_user: models.User = Depends(auth.get_current_active_user),
    session: Session = Depends(db.get_db),
):
    prod = session.query(models.Product).get(product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    if prod.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to edit this product")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(prod, field, value)
    session.commit()
    session.refresh(prod)
    return prod


@router.delete("/{product_id}", status_code=204)
def delete_product(
    product_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    session: Session = Depends(db.get_db),
):
    prod = session.query(models.Product).get(product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Product not found")
    if prod.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this product")
    session.delete(prod)
    session.commit()
    return None
