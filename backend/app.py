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

# Route: Add words from MongoDB
@app.route("/api/words", methods=["POST"])
def add_word():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input provided"}), 400

    # Validate required fields
    required_fields = ["word", "language", "translations"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    # Prepare the new document
    new_word = {
        "word": data["word"],
        "language": data["language"],
        "translations": data["translations"],
        "pronunciation": data.get("pronunciation", ""),
        "category": data.get("category", "")
    }

    # Insert into DB
    result = mongo.db.words.insert_one(new_word)
    new_word["_id"] = str(result.inserted_id)

    return jsonify(new_word), 201


if __name__ == "__main__":
    app.run(debug=True)

