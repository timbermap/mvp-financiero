# jobs/run_weekly_analysis.py
import asyncio
import os
import sys
from dotenv import load_dotenv

# --- INICIO DE LA CORRECCIÓN ---
# 1. Obtener la ruta absoluta a la carpeta raíz del proyecto ('backend')
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 2. Añadir la raíz del proyecto al path de Python
sys.path.insert(0, project_root)
# 3. Cargar el archivo .env desde la raíz del proyecto
dotenv_path = os.path.join(project_root, '.env')
load_dotenv(dotenv_path=dotenv_path)
# --- FIN DE LA CORRECCIÓN ---

# Ahora los imports funcionarán correctamente
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.db.models import SectorRotation, Base, User

DATABASE_URL = os.getenv("DATABASE_URL")

# Verificación para asegurarnos de que la URL de la base de datos se cargó
if not DATABASE_URL:
    raise ValueError("No se encontró DATABASE_URL. Asegúrate de que tu archivo .env está en la carpeta 'backend' y tiene el formato correcto.")

engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def populate_data():
    async with AsyncSessionLocal() as db:
        await db.execute(SectorRotation.__table__.delete())
        await db.commit()
        print("Datos antiguos de rotación de sectores eliminados.")

        # --- DATOS REALISTAS DE LA TABLA ---
        mock_sectors = [
            {
                "rank": 1, "sector": "MINING", "score": 81.8,
                "market_context": "Dominant capital sink for inflation hedging and copper/gold demand.",
                "phase_and_health": "Bullish Bias\nPhase: Impulse\nHealth: 100",
                "rationale_and_elliott_wave": "100% of stocks above 50/200D SMAs. Correcting slightly in Wave 4, potential Wave 5 upside to +15% as copper supply tightens. RSI 59.7 is healthy.",
                "risk_and_volume_profile": "Beta: 1.15 | Ext: 7.3%\nRVOL: 0.39 | Trend: 90%\nVol Forecast: Moderate",
                "execution_protocol": "Long on pullbacks to 20D SMA.",
                "top_3_tickers": "FCX: Entry 63.0, Target 75.0, Stop 59.0.\nSCCO: Entry 200.0, Target 230.0, Stop 185.0.\nNEM: Entry 120.0, Target 145.0, Stop 112.0.",
                "sector_portfolio_percentage": 18.0,
                "week_targets": "Upside: +15%\nDownside: -6%\nR:R: 2.5"
            },
            {
                "rank": 2, "sector": "ENERGY", "score": 80.4,
                "market_context": "Oil services and offshore drilling seeing massive institutional accumulation.",
                "phase_and_health": "Bullish Bias\nPhase: Impulse\nHealth: 100",
                "rationale_and_elliott_wave": "Strong Wave 3 extension. Avg 1m change of 18.7% shows massive momentum. RIG and FTI leading with high RS scores.",
                "risk_and_volume_profile": "Beta: 0.85 | Ext: 8.7%\nRVOL: 0.39 | Trend: 80%\nVol Forecast: High",
                "execution_protocol": "Aggressive long on breakout of 52w highs.",
                "top_3_tickers": "RIG: Entry 5.8, Target 8.0, Stop 4.9.\nFTI: Entry 61.0, Target 72.0, Stop 56.0.\nSLB: Entry 51.0, Target 60.0, Stop 47.0.",
                "sector_portfolio_percentage": 18.0,
                "week_targets": "Upside: +20%\nDownside: -8%\nR:R: 2.5"
            },
            {
                "rank": 3, "sector": "MATERIALS", "score": 78.2,
                "market_context": "Infrastructure and steel demand remains robust despite tech weakness.",
                "phase_and_health": "Bullish Bias\nPhase: Impulse\nHealth: 86",
                "rationale_and_elliott_wave": "Wave 3 impulse with NUE and BHP showing strong relative strength. 90% above 50D SMA confirms trend.",
                "risk_and_volume_profile": "Beta: 1.35 | Ext: 1.9%\nRVOL: 0.31 | Trend: 60%\nVol Forecast: Moderate",
                "execution_protocol": "Long trend continuations in steel and diversified miners.",
                "top_3_tickers": "NUE: Entry 195.0, Target 225.0, Stop 182.0.\nBHP: Entry 74.0, Target 85.0, Stop 69.0.\nRIO: Entry 99.0, Target 115.0, Stop 92.0.",
                "sector_portfolio_percentage": 15.0,
                "week_targets": "Upside: +12%\nDownside: -5%\nR:R: 2.4"
            },
            {
                "rank": 4, "sector": "FINANCIALS", "score": 69.8,
                "market_context": "Benefiting from steepening yield curve and cyclical rotation.",
                "phase_and_health": "Neutral/Bullish\nPhase: Wave 2\nHealth: 58",
                "rationale_and_elliott_wave": "Currently in Wave 2 consolidation. RS score of 1.05 is stable. JPM and C showing accumulation signs.",
                "risk_and_volume_profile": "Beta: 1.12 | Ext: 0.3%\nRVOL: 0.45 | Trend: 89%\nVol Forecast: Low",
                "execution_protocol": "Buy the dip at 50D SMA support.",
                "top_3_tickers": "C: Entry 118.0, Target 135.0, Stop 112.0.\nJPM: Entry 315.0, Target 350.0, Stop 300.0.\nRF: Entry 30.5, Target 36.0, Stop 28.5.",
                "sector_portfolio_percentage": 10.0,
                "week_targets": "Upside: +10%\nDownside: -4%\nR:R: 2.5"
            },
            {
                "rank": 5, "sector": "CONSUMER", "score": 65.2,
                "market_context": "Defensive positioning in staples; overbought in the short term.",
                "phase_and_health": "Neutral Bias\nPhase: Wave 5\nHealth: 92",
                "rationale_and_elliott_wave": "Wave 5 extension near completion. RSI 74.7 suggests overbought conditions. WMT and PG at resistance.",
                "risk_and_volume_profile": "Beta: 0.45 | Ext: 4.8%\nRVOL: 1.56 | Trend: 60%\nVol Forecast: Low",
                "execution_protocol": "Wait for Wave A correction before entry.",
                "top_3_tickers": "WMT: Entry 122.0, Target 135.0, Stop 118.0.\nKO: Entry 75.0, Target 82.0, Stop 72.0.\nPEP: Entry 162.0, Target 175.0, Stop 158.0.",
                "sector_portfolio_percentage": 8.0,
                "week_targets": "Upside: +5%\nDownside: -3%\nR:R: 1.6"
            },
            {
                "rank": 6, "sector": "UTILITIES", "score": 64.1,
                "market_context": "Yield-seeking capital moving into NEE and DUK.",
                "phase_and_health": "Neutral Bias\nPhase: Wave 3\nHealth: 82",
                "rationale_and_elliott_wave": "Steady Wave 3 climb. RSI 66 is approaching overbought. Low volatility forecast makes it a safe haven.",
                "risk_and_volume_profile": "Beta: 0.65 | Ext: 2.3%\nRVOL: 0.29 | Trend: 70%\nVol Forecast: Low",
                "execution_protocol": "Long on minor pullbacks.",
                "top_3_tickers": "NEE: Entry 90.0, Target 100.0, Stop 86.0.\nDUK: Entry 123.0, Target 132.0, Stop 119.0.\nD: Entry 63.0, Target 70.0, Stop 60.0.",
                "sector_portfolio_percentage": 8.0,
                "week_targets": "Upside: +8%\nDownside: -3%\nR:R: 2.6"
            },
            {
                "rank": 7, "sector": "HEALTHCARE", "score": 63.4,
                "market_context": "Mixed performance; JNJ strong while UNH drags.",
                "phase_and_health": "Neutral Bias\nPhase: Wave 4\nHealth: 68",
                "rationale_and_elliott_wave": "Consolidating in Wave 4. JNJ is extremely overbought (RSI 92), while UNH is oversold (RSI 20).",
                "risk_and_volume_profile": "Beta: 0.55 | Ext: 1.8%\nRVOL: 0.34 | Trend: 100%\nVol Forecast: Moderate",
                "execution_protocol": "Selective longs in pharma; avoid overextended JNJ.",
                "top_3_tickers": "MRK: Entry 117.0, Target 130.0, Stop 112.0.\nPFE: Entry 27.5, Target 32.0, Stop 26.0.\nBMY: Entry 60.0, Target 68.0, Stop 57.0.",
                "sector_portfolio_percentage": 8.0,
                "week_targets": "Upside: +7%\nDownside: -4%\nR:R: 1.75"
            },
            {
                "rank": 8, "sector": "ARGENTINA", "score": 56.4,
                "market_context": "High-risk cyclical play; YPF and VIST showing energy strength.",
                "phase_and_health": "Neutral Bias\nPhase: Wave 2\nHealth: 56",
                "rationale_and_elliott_wave": "Corrective Wave 2. RS score 0.92 is lagging but energy exposure provides a floor.",
                "risk_and_volume_profile": "Beta: 0.45 | Ext: -4.7%\nRVOL: 0.30 | Trend: 80%\nVol Forecast: Moderate",
                "execution_protocol": "Speculative long on YPF/VIST only.",
                "top_3_tickers": "YPF: Entry 38.0, Target 45.0, Stop 35.0.\nVIST: Entry 54.0, Target 65.0, Stop 50.0.\nBMA: Entry 92.0, Target 110.0, Stop 85.0.",
                "sector_portfolio_percentage": 5.0,
                "week_targets": "Upside: +15%\nDownside: -10%\nR:R: 1.5"
            },
            {
                "rank": 9, "sector": "BIOTECH", "score": 48.0,
                "market_context": "Significant underperformance; capital fleeing to real assets.",
                "phase_and_health": "Bearish Bias\nPhase: Wave C\nHealth: 47",
                "rationale_and_elliott_wave": "Corrective Wave C in progress. Only 33% above 50D SMA. MRNA and VKTX are in freefall.",
                "risk_and_volume_profile": "Beta: 0.85 | Ext: -3.7%\nRVOL: 0.29 | Trend: 22%\nVol Forecast: Moderate",
                "execution_protocol": "Avoid longs; look for short covers at 200D SMA.",
                "top_3_tickers": "REGN: Entry 760.0, Target 820.0, Stop 730.0.\nLLY: Avoid Long Setup.\nXBI: Avoid Long Setup.",
                "sector_portfolio_percentage": 4.0,
                "week_targets": "Upside: +4%\nDownside: -8%\nR:R: 0.5"
            },
            {
                "rank": 10, "sector": "DATA CENTER", "score": 47.3,
                "market_context": "AI infrastructure cooling off; VRT and GLW overextended.",
                "phase_and_health": "Bearish Bias\nPhase: Wave B\nHealth: 82",
                "rationale_and_elliott_wave": "Counter-trend Wave B bounce. VRT and GLW are extremely overbought (RSI > 75). Extension > 20% is a major risk.",
                "risk_and_volume_profile": "Beta: 1.45 | Ext: 8.6%\nRVOL: 0.53 | Trend: 70%\nVol Forecast: High",
                "execution_protocol": "Short overextended names on RSI divergence.",
                "top_3_tickers": "VRT: Short Entry 236.0, Target 190.0, Stop 255.0.\nGLW: Short Entry 131.0, Target 110.0, Stop 142.0.\nETN: Avoid Long Setup.",
                "sector_portfolio_percentage": 3.0,
                "week_targets": "Upside: +3%\nDownside: -15%\nR:R: 0.2"
            },
            {
                "rank": 11, "sector": "SPACE", "score": 45.9,
                "market_context": "Speculative growth being liquidated for cyclical liquidity.",
                "phase_and_health": "Bearish Bias\nPhase: Wave 2\nHealth: 44",
                "rationale_and_elliott_wave": "Deep Wave 2 correction. RKLB and ASTS failing key SMA levels. RS score 1.13 is misleading due to 3m lag.",
                "risk_and_volume_profile": "Beta: 2.25 | Ext: -14.7%\nRVOL: 0.29 | Trend: 28%\nVol Forecast: High",
                "execution_protocol": "Avoid until 50D SMA is reclaimed.",
                "top_3_tickers": "LUNR: Entry 16.0, Target 22.0, Stop 14.0.\nPL: Avoid Long Setup.\nRKLB: Avoid Long Setup.",
                "sector_portfolio_percentage": 3.0,
                "week_targets": "Upside: +10%\nDownside: -20%\nR:R: 0.5"
            },
            {
                "rank": 12, "sector": "SEMICONDUCTORS", "score": 30.9,
                "market_context": "Major distribution phase; AI hype cycle unwinding.",
                "phase_and_health": "Bearish Bias\nPhase: Wave A\nHealth: 74",
                "rationale_and_elliott_wave": "Entering Wave A distribution. NVDA and AMD showing lower highs. TSM is the only outlier.",
                "risk_and_volume_profile": "Beta: 1.65 | Ext: 1.4%\nRVOL: 0.42 | Trend: 90%\nVol Forecast: High",
                "execution_protocol": "Short the rallies; TSM is the only \"hold.\"",
                "top_3_tickers": "NVDA: Short Entry 190.0, Target 160.0, Stop 205.0.\nAMD: Short Entry 210.0, Target 175.0, Stop 225.0.\nTSM: Hold only.",
                "sector_portfolio_percentage": 0.0,
                "week_targets": "Upside: +2%\nDownside: -18%\nR:R: 0.1"
            },
            {
                "rank": 13, "sector": "CRYPTO", "score": 21.2,
                "market_context": "Liquidity drain hitting high-beta digital assets hardest.",
                "phase_and_health": "Bearish Bias\nPhase: Wave C\nHealth: 20",
                "rationale_and_elliott_wave": "Wave C crash. COIN and HOOD RSI < 25. 1m change of -22% is catastrophic.",
                "risk_and_volume_profile": "Beta: 4.15 | Ext: -13.4%\nRVOL: 0.42 | Trend: 90%\nVol Forecast: Extreme",
                "execution_protocol": "Short-only bias on any 1w relief bounce.",
                "top_3_tickers": "COIN: Short Entry 155.0, Target 120.0, Stop 175.0.\nHOOD: Short Entry 80.0, Target 55.0, Stop 95.0.\nMSTR: Avoid Long Setup.",
                "sector_portfolio_percentage": 0.0,
                "week_targets": "Upside: +5%\nDownside: -25%\nR:R: 0.2"
            },
            {
                "rank": 14, "sector": "BIG TECH", "score": 0.0,
                "market_context": "Institutional exodus from \"Magnificent 7\" into real assets.",
                "phase_and_health": "Bearish Bias\nPhase: Wave 3 Down\nHealth: 24",
                "rationale_and_elliott_wave": "Primary Wave 3 downside impulse. CRM, ADBE, and AMZN in technical breakdowns. RSI < 30 across the board.",
                "risk_and_volume_profile": "Beta: 1.35 | Ext: -6.5%\nRVOL: 0.44 | Trend: 90%\nVol Forecast: Moderate",
                "execution_protocol": "Short the sector via QQQ or individual laggards.",
                "top_3_tickers": "CRM: Short Entry 185.0, Target 150.0, Stop 205.0.\nADBE: Short Entry 260.0, Target 220.0, Stop 285.0.\nAMZN: Short Entry 205.0, Target 175.0, Stop 220.0.",
                "sector_portfolio_percentage": 0.0,
                "week_targets": "Upside: +1%\nDownside: -20%\nR:R: 0.05"
            }
        ]

        for data in mock_sectors:
            record = SectorRotation(**data)
            db.add(record)

        await db.commit()
        print(f"{len(mock_sectors)} registros de rotación de sectores insertados con éxito.")

async def main():
    await create_tables()
    await populate_data()

if __name__ == "__main__":
    asyncio.run(main())

