from typing import Optional
from pydantic import BaseModel, ConfigDict


class ProductBase(BaseModel):
    title: str
    description: Optional[str] = ""
    category: str
    price: float
    image_url: Optional[str] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None


class ProductOut(ProductBase):
    id: int
    owner_id: int
    model_config = ConfigDict(from_attributes=True)


class ProductFilter(BaseModel):
    q: Optional[str] = None
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
