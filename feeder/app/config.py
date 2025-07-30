import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Application configuration"""
    
    # Server settings
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "8000"))
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
    
    # Coingecko
    COINGECKO_API_URL = os.getenv("COINGECKO_API_URL", "https://api.coingecko.com/api/v3")
    COINGECKO_TIMEOUT = int(os.getenv("COINGECKO_TIMEOUT", "30"))
    
    # API Configuration
    ENTVAS_API_URL = os.getenv("ENTVAS_API_URL", "http://localhost:3000")
    FEED_INTERVAL = int(os.getenv("FEED_INTERVAL", "60"))
    
    # CORS settings
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")
    CORS_CREDENTIALS = os.getenv("CORS_CREDENTIALS", "True").lower() == "true"
    CORS_METHODS = os.getenv("CORS_METHODS", "*").split(",")
    CORS_HEADERS = os.getenv("CORS_HEADERS", "*").split(",") 