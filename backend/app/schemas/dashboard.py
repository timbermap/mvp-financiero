from pydantic import BaseModel
from datetime import datetime

class SectorRotationSchema(BaseModel):
    sector: str
    signal: str
    score: float

    class Config:
        orm_mode = True