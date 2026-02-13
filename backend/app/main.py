# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Union
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

from app.api.v1.deps import get_db, get_current_user
from app.db.models import SectorRotation, User, SubscriptionTier

app = FastAPI(title="MVP Financiero API")

# CORS mejorado: permite localhost y Vercel (ajusta origins en prod)
origins = [
    "http://localhost:3000",
    "https://*.vercel.app",  # Para tu deploy en Vercel
    "*",  # Temporal para testing, remueve en prod
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemas para respuestas (mejora: validación y docs)
class SectorFreeSchema(BaseModel):
    analysis_date: str  # Agregado para consistencia con PRO
    rank: int
    sector: str
    score: float
    signal: str

class SectorProSchema(BaseModel):
    analysis_date: str
    rank: int
    sector: str
    score: float
    signal: str  # Calculado
    market_context: str
    phase_and_health: str
    rationale_and_elliott_wave: str
    risk_and_volume_profile: str
    execution_protocol: str
    top_3_tickers: str
    sector_portfolio_percentage: float
    week_targets: str

@app.get("/")
def read_root():
    return {"Status": "API is running"}

@app.get("/api/v1/dashboard", response_model=Union[List[SectorProSchema], List[SectorFreeSchema]])
async def get_dashboard_data(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Union[List[SectorProSchema], List[SectorFreeSchema]]:
    # Obtener todos los datos, ordenados
    result = await db.execute(
        select(SectorRotation)
        .order_by(SectorRotation.analysis_date.desc(), SectorRotation.rank.asc())
    )
    full_analysis = result.scalars().all()

    if not full_analysis:
        raise HTTPException(status_code=404, detail="No hay datos de análisis disponibles")

    def calculate_signal(rank: int) -> str:
        if rank <= 30:
            return "Overweight"
        elif rank >= 85:
            return "Underweight"
        else:
            return "Neutral"

    if current_user.subscription_tier == SubscriptionTier.PRO:
        # Respuesta PRO: todos los campos + signal calculado
        return [
            SectorProSchema(
                analysis_date=item.analysis_date.isoformat(),
                rank=item.rank,
                sector=item.sector,
                score=item.score,
                signal=calculate_signal(item.rank),
                market_context=item.market_context,
                phase_and_health=item.phase_and_health,
                rationale_and_elliott_wave=item.rationale_and_elliott_wave,
                risk_and_volume_profile=item.risk_and_volume_profile,
                execution_protocol=item.execution_protocol,
                top_3_tickers=item.top_3_tickers,
                sector_portfolio_percentage=item.sector_portfolio_percentage,
                week_targets=item.week_targets,
            )
            for item in full_analysis
        ]
    else:
        # Respuesta FREE: limitado a 4 items, con las 4 primeras columnas (analysis_date, rank, sector, score) + signal calculado
        limited_analysis = full_analysis  # Limitar a los primeros 4
        return [
            SectorFreeSchema(
                analysis_date=item.analysis_date.isoformat(),
                rank=item.rank,
                sector=item.sector,
                score=item.score,
                signal=calculate_signal(item.rank),
                market_context=item.market_context,
                phase_and_health=item.phase_and_health,
                rationale_and_elliott_wave=item.rationale_and_elliott_wave,
                risk_and_volume_profile=item.risk_and_volume_profile,
                execution_protocol=item.execution_protocol,
                top_3_tickers=item.top_3_tickers,
                sector_portfolio_percentage=item.sector_portfolio_percentage,
                week_targets=item.week_targets,
            )
            for item in limited_analysis
        ]