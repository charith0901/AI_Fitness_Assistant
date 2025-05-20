from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router as fitness_router


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","https://ai-fitness-assistant-273p.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fitness_router, tags=["fitness"])