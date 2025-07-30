from fastapi import APIRouter, Response, Request

router = APIRouter()

@router.get("/")
async def root(request: Request):
    return {
        "title": "Entvast Test Data Feeder",
        "description": "Sends data to the Entvas test API",
        "url": str(request.url),
        "version": "1.0.0"
    }

@router.get("/health")
async def health_check():
    return {"status": "healthy"}

@router.get("/health/detailed")
async def detailed_health_check(response: Response):
    # You can set custom status codes
    response.status_code = 200
    return {"status": "healthy", "details": "All systems operational"} 