
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import Base, engine
from app.routers import auth, reports, analytics
from app.routers import products, cart, purchases

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EcoFinds API",
    description="Backend for the EcoFinds platform.",
    version="1.0.0"
)

# --- CORS Middleware ---
# IMPORTANT: Update origin to your Vercel frontend URL in production
origins = [
    "http://localhost:3000",
    "http://localhost:5173", # Vite default
    # "https://your-frontend-domain.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(reports.router, prefix="/reports", tags=["Reports"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(purchases.router)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the EcoFinds API"}

