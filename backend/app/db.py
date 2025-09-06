
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from pathlib import Path

# Load environment variables from the backend/.env file for local development
try:
    from dotenv import load_dotenv  # type: ignore
    # Resolve backend directory (parent of this file's folder)
    _BASE_DIR = Path(__file__).resolve().parent.parent
    load_dotenv(_BASE_DIR / ".env")
except Exception:
    # python-dotenv may not be installed in some environments (e.g., Render where env vars are injected)
    pass


def _normalize_db_url(url: str) -> str:
    """Normalize common Postgres URL schemes for SQLAlchemy/psycopg2."""
    if url.startswith("postgres://"):
        # SQLAlchemy recommends the 'postgresql+psycopg2' scheme
        return url.replace("postgres://", "postgresql+psycopg2://", 1)
    return url


# Prefer DATABASE_URL (typical in cloud) but also accept 'db_url' or 'DB_URL' from local .env
_env_candidates = [
    os.getenv("DATABASE_URL"),
    os.getenv("db_url"),
    os.getenv("DB_URL"),
]

_db_url = next((u for u in _env_candidates if u), None)

if _db_url:
    SQLALCHEMY_DATABASE_URL = _normalize_db_url(_db_url)
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
else:
    # SQLite file in backend directory for easy local runs
    SQLITE_URL = "sqlite:///./ecofinds.db"
    SQLALCHEMY_DATABASE_URL = SQLITE_URL
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
