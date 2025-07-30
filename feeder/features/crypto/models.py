from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime

class CryptoAsset(BaseModel):
    """Model for cryptocurrency asset data"""
    id: str
    symbol: str
    name: str
    current_price: Optional[float]
    market_cap: Optional[int]
    market_cap_rank: Optional[int]
    total_volume: Optional[float]
    price_change_24h: Optional[float]
    price_change_percentage_24h: Optional[float]

class CryptoResponse(BaseModel):
    """Model for crypto API response"""
    message: str
    timestamp: str
    source: str
    data: list[Dict[str, Any]] 