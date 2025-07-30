import requests
from typing import List, Dict, Any
from app.config import Config

class CoinGeckoService:
    """Service for interacting with CoinGecko API"""
    
    def __init__(self):
        self.base_url = Config.COINGECKO_API_URL
        self.timeout = Config.COINGECKO_TIMEOUT
    
    async def get_top_assets(self, limit: int = 50, currency: str = "usd") -> List[Dict[str, Any]]:
        """
        Fetch top assets from CoinGecko
        
        Args:
            limit: Number of assets to fetch (default: 50)
            currency: Currency to price in (default: "usd")
            
        Returns:
            List of asset data
        """
        url = f"{self.base_url}/coins/markets"
        params = {
            "vs_currency": currency,
            "order": "market_cap_desc",
            "per_page": limit,
            "page": 1,
            "sparkline": False
        }
        
        response = requests.get(url, params=params, timeout=self.timeout)
        response.raise_for_status()
        
        return response.json() 