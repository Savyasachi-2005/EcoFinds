
from pydantic import BaseModel, EmailStr, ConfigDict
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
    model_config = ConfigDict(from_attributes=True)

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
    model_config = ConfigDict(from_attributes=True)

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
    model_config = ConfigDict(from_attributes=True)
