"""Pydantic schemas package aggregator for EcoFinds."""

from .user import User, UserBase, UserCreate, Token, TokenData  # noqa: F401
from .product import ProductCreate, ProductUpdate, ProductOut, ProductFilter  # noqa: F401
from .order import CartItemCreate, CartItemOut, PurchaseCreate, PurchaseOut  # noqa: F401
from .schemas import (  # type: ignore  # noqa: F401
	Token as LegacyToken,
	TokenData as LegacyTokenData,
	User as LegacyUser,
	UserBase as LegacyUserBase,
	UserCreate as LegacyUserCreate,
	Report as LegacyReport,
	ReportBase as LegacyReportBase,
	ReportCreate as LegacyReportCreate,
)
