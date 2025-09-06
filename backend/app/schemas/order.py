from pydantic import BaseModel, ConfigDict


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1


class CartItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    model_config = ConfigDict(from_attributes=True)


class PurchaseCreate(BaseModel):
    product_id: int
    quantity: int = 1


class PurchaseOut(BaseModel):
    id: int
    product_id: int
    quantity: int
    total_price: float
    model_config = ConfigDict(from_attributes=True)
