from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv
from bson import ObjectId
from config import Config

app = Flask(__name__)
# MongoDB Configuration
app.config.from_object(Config)
CORS(app)  # Allow requests from frontend

mongo = PyMongo(app)

# Load environment variables from .env
load_dotenv()

# Helper: Format MongoDB documents for JSON
def format_word(doc):
    return {
        "_id": str(doc["_id"]),
        "word": doc.get("word"),
        "language": doc.get("language"),
        "translations": doc.get("translations"),
        "pronunciation": doc.get("pronunciation")
    }

# Route: Get all words from MongoDB
@app.route("/api/words", methods=["GET"])
def get_words():
    words_cursor = mongo.db.words.find()
    words = [format_word(word) for word in words_cursor]
    return jsonify(words), 200


if __name__ == "__main__":
    app.run(debug=True)

