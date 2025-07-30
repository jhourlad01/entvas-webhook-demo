# Entvast Test Data Feeder

Sends data to the Entvas test API with basic setup and configuration.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

### Development server
```bash
python main.py
```

### Using uvicorn directly
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, you can access:

- **Interactive API docs (Swagger UI)**: http://localhost:8000/docs
- **Alternative API docs (ReDoc)**: http://localhost:8000/redoc
- **OpenAPI schema**: http://localhost:8000/openapi.json

## Available Endpoints

- `GET /` - Hello World message
- `GET /health` - Health check endpoint

## Project Structure

```
feeder/
├── main.py              # Main FastAPI application
├── requirements.txt     # Python dependencies
└── README.md           # This file
``` 