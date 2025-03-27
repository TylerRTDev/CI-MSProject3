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

# Sample data to simulate MongoDB records
sample_words = [
    {
        "_id": "1",
        "word": "Hello",
        "language": "English",
        "translations": {
            "Lithuanian": "Labas",
            "Spanish": "Hola"
        },
        "pronunciation": "heh-lo"
    },
    {
        "_id": "2",
        "word": "Thank you",
        "language": "English",
        "translations": {
            "Lithuanian": "Ačiū",
            "French": "Merci"
        },
        "pronunciation": "ah-choo"
    }
]

# Route: Get all words
@app.route("/api/words", methods=["GET"])
def get_words():
    return jsonify(sample_words), 200

if __name__ == "__main__":
    app.run(debug=True)

