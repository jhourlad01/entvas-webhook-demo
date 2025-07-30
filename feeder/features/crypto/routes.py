from datetime import datetime
from fastapi import APIRouter, Request, HTTPException, status
from .services import CoinGeckoService

router = APIRouter()
coingecko_service = CoinGeckoService()

@router.get("/data")
async def get_data(request: Request):
    try:
        # Fetch top 50 assets from CoinGecko
        assets = await coingecko_service.get_top_assets(limit=50)
        
        return {
            "message": "Top 50 assets from CoinGecko",
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "source": str(request.url),
            "data": assets
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch data from CoinGecko: {str(e)}"
        ) 