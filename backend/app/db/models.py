# backend/app/db/models.py
from sqlalchemy import Column, Integer, String, Float, Date, Text, DateTime, func, Enum as SQLAlchemyEnum
from sqlalchemy.ext.declarative import declarative_base
import datetime
import enum

Base = declarative_base()

# --- Tus otros modelos (User, SubscriptionTier) se mantienen igual ---
class SubscriptionTier(str, enum.Enum):
    FREE = "FREE"
    PRO = "PRO"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    subscription_tier = Column(SQLAlchemyEnum(SubscriptionTier), nullable=False, default=SubscriptionTier.FREE)
    created_at = Column(DateTime, nullable=False, default=func.now())

# --- MODELO ACTUALIZADO ---
class SectorRotation(Base):
    __tablename__ = "sector_rotations"
    
    id = Column(Integer, primary_key=True, index=True)
    analysis_date = Column(Date, default=datetime.date.today, nullable=False) # fecha(dia)
    rank = Column(Integer, nullable=False) # Rank
    sector = Column(String, index=True, nullable=False) # Sector
    score = Column(Float) # Score
    market_context = Column(Text) # Market Context
    phase_and_health = Column(Text) # Phase & Health
    rationale_and_elliott_wave = Column(Text) # Rationale & Elliott Wave
    risk_and_volume_profile = Column(Text) # Risk & Volume Profile
    execution_protocol = Column(Text) # Execution Protocol
    top_3_tickers = Column(String) # Top 3 Tickers (ej. "AAPL, MSFT, GOOG")
    sector_portfolio_percentage = Column(Float) # Sector Portfolio %
    week_targets = Column(String) # 2–4 Week Targets