from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .routes import auth, entries

app = FastAPI(title="Wellbeing Journal API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
@app.on_event("startup")
def startup_event():
    init_db()

# Include routers
app.include_router(auth.router)
app.include_router(entries.router)

@app.get("/")
def root():
    return {"message": "Wellbeing Journal API"}

@app.get("/health")
def health():
    return {"status": "healthy"}

