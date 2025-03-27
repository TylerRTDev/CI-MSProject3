from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
uri = os.getenv("MONGO_URI")

try:
    client = MongoClient(uri)
    db = client.get_database()  # Optional: pass a name if needed
    print("✅ Connection successful!")
    print("Databases:", client.list_database_names())
except Exception as e:
    print("❌ Connection failed:", e)
