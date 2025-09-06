
from pydantic import BaseModel, EmailStr
from typing import List, Optional

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        orm_mode = True

# Item Schemas
class ItemBase(BaseModel):
    title: str
    category: str
    eco_score: float

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True

# Report Schemas
class ReportBase(BaseModel):
    description: str
    location: str

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int
    status: str
    user_id: int
    class Config:
        orm_mode = True
