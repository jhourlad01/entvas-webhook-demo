from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import Config
from features.health import routes as health_routes
from features.crypto import routes as crypto_routes

def create_app() -> FastAPI:
    """Create and configure the FastAPI application"""
    
    app = FastAPI(
        title="Entvast Test Data Feeder",
        description="Sends data to the Entvas test API",
        version="1.0.0"
    )
    
    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=Config.CORS_ORIGINS,
        allow_credentials=Config.CORS_CREDENTIALS,
        allow_methods=Config.CORS_METHODS,
        allow_headers=Config.CORS_HEADERS,
    )
    
    # Include feature routers
    app.include_router(health_routes.router, tags=["health"])
    app.include_router(crypto_routes.router, tags=["crypto"])
    
    return app 