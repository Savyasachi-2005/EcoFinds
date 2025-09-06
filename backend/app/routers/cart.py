from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import db, auth
from app.models import models
from app.schemas import order as order_schema

router = APIRouter(prefix="/cart", tags=["Cart"])


@router.get("/", response_model=List[order_schema.CartItemOut])
def get_cart(current_user: models.User = Depends(auth.get_current_active_user), session: Session = Depends(db.get_db)):
    return session.query(models.CartItem).filter(models.CartItem.user_id == current_user.id).all()


@router.post("/add", response_model=order_schema.CartItemOut)
def add_to_cart(
    payload: order_schema.CartItemCreate,
    current_user: models.User = Depends(auth.get_current_active_user),
    session: Session = Depends(db.get_db),
):
    product = session.query(models.Product).get(payload.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    item = (
        session.query(models.CartItem)
        .filter(models.CartItem.user_id == current_user.id, models.CartItem.product_id == payload.product_id)
        .first()
    )
    if item:
        item.quantity += payload.quantity
    else:
        item = models.CartItem(user_id=current_user.id, product_id=payload.product_id, quantity=payload.quantity)
        session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.post("/remove/{cart_item_id}", status_code=204)
def remove_from_cart(
    cart_item_id: int,
    current_user: models.User = Depends(auth.get_current_active_user),
    session: Session = Depends(db.get_db),
):
    item = session.query(models.CartItem).get(cart_item_id)
    if not item or item.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Cart item not found")
    session.delete(item)
    session.commit()
    return None
