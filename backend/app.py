from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv
from config import Config


# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# MongoDB Configuration
app.config.from_object(Config)
mongo = PyMongo(app)

# Route: Health Check
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the LingoLink API!"}), 200

if __name__ == "__main__":
    app.run(debug=True)
