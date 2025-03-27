import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")  # Optional, for forms/auth
    DEBUG = True
