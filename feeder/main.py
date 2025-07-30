"""Data feeder that fetches crypto data from CoinGecko and sends to API."""

import asyncio
import time
import requests
from datetime import datetime, timezone
from app.config import Config


class DataFeeder:
    """Fetches crypto data and sends to API."""
    
    def __init__(self):
        """Initialize configuration."""
        self.api_url = Config.ENTVAS_API_URL
        self.coingecko_url = Config.COINGECKO_API_URL
        self.timeout = Config.COINGECKO_TIMEOUT
        self.interval = int(Config.FEED_INTERVAL or "60")  # Default 60 seconds
        
    async def fetch_crypto_data(self):
        """Fetch top 50 assets from CoinGecko."""
        try:
            url = f"{self.coingecko_url}/coins/markets"
            params = {
                "vs_currency": "usd",
                "order": "market_cap_desc",
                "per_page": 50,
                "page": 1,
                "sparkline": False
            }
            
            response = requests.get(url, params=params, timeout=self.timeout)
            response.raise_for_status()
            
            return response.json()
        except Exception as e:
            print(f"Error fetching from CoinGecko: {e}")
            return None
    
    async def send_to_api(self, data):
        """Send event data to API."""
        try:
            event_data = {
                "eventType": "crypto_price_update",
                "userId": "feeder_bot",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "metadata": {
                    "source": "coingecko",
                    "assets_count": len(data),
                    "top_assets": [asset["symbol"] for asset in data[:5]]
                }
            }
            
            response = requests.post(
                f"{self.api_url}/api/events",
                json=event_data,
                timeout=self.timeout
            )
            response.raise_for_status()
            
            print(f"Sent {len(data)} assets to API at {datetime.now().strftime('%H:%M:%S')}")
            return True
            
        except Exception as e:
            print(f"Error sending to API: {e}")
            return False
    
    async def run(self):
        """Main loop - fetch and send data continuously."""
        print(f"Starting Data Feeder...")
        print(f"Fetching from: {self.coingecko_url}")
        print(f"Sending to: {self.api_url}")
        print(f"Interval: {self.interval} seconds")
        print(f"Press Ctrl+C to stop\n")
        
        while True:
            try:
                print(f"Fetching crypto data...")
                crypto_data = await self.fetch_crypto_data()
                
                if crypto_data:
                    await self.send_to_api(crypto_data)
                else:
                    print("No data fetched, skipping this cycle")
                
                print(f"Waiting {self.interval} seconds...\n")
                await asyncio.sleep(self.interval)
                
            except KeyboardInterrupt:
                print("\nStopping Data Feeder...")
                break
            except Exception as e:
                print(f"Unexpected error: {e}")
                print(f"Retrying in {self.interval} seconds...\n")
                await asyncio.sleep(self.interval)

if __name__ == "__main__":
    feeder = DataFeeder()
    asyncio.run(feeder.run()) 