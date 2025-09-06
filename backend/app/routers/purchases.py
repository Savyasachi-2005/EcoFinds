from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import db, auth
from app.models import models
from app.schemas import order as order_schema

router = APIRouter(prefix="/purchases", tags=["Purchases"])


@router.get("/", response_model=List[order_schema.PurchaseOut])
def list_purchases(current_user: models.User = Depends(auth.get_current_active_user), session: Session = Depends(db.get_db)):
    return (
        session.query(models.Purchase)
        .filter(models.Purchase.user_id == current_user.id)
        .order_by(models.Purchase.purchased_at.desc())
        .all()
    )


@router.post("/checkout", response_model=List[order_schema.PurchaseOut])
def checkout(current_user: models.User = Depends(auth.get_current_active_user), session: Session = Depends(db.get_db)):
    cart_items = session.query(models.CartItem).filter(models.CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    purchases: list[models.Purchase] = []
    for item in cart_items:
        price = item.product.price
        purchase = models.Purchase(
            user_id=current_user.id,
            product_id=item.product_id,
            quantity=item.quantity,
            total_price=price * item.quantity,
        )
        session.add(purchase)
        purchases.append(purchase)
        session.delete(item)

    session.commit()
    # refresh to get IDs and timestamps
    for p in purchases:
        session.refresh(p)
    return purchases
