from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv
from bson import ObjectId
from config import Config
from bson.objectid import ObjectId


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

# Route: Delete words from MongoDB
@app.route("/api/words/<word_id>", methods=["DELETE"])
def delete_word(word_id):
    try:
        result = mongo.db.words.delete_one({"_id": ObjectId(word_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Word not found"}), 404

        return jsonify({"message": "Word deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Route: Update words from MongoDB
@app.route("/api/words/<word_id>", methods=["PUT"])
def update_word(word_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input provided"}), 400

    update_fields = {}

    # Allow updates to any of these fields
    for field in ["word", "language", "translations", "pronunciation", "category"]:
        if field in data:
            update_fields[field] = data[field]

    if not update_fields:
        return jsonify({"error": "No valid fields provided to update"}), 400

    try:
        result = mongo.db.words.update_one(
            {"_id": ObjectId(word_id)},
            {"$set": update_fields}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Word not found"}), 404

        return jsonify({"message": "Word updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/api/words/batch", methods=["POST"])
def add_multiple_words():
    data = request.get_json()
    if not isinstance(data, list):
        return jsonify({"error": "Expected a list of word objects"}), 400

    inserted = mongo.db.words.insert_many(data)
    return jsonify({"inserted_ids": [str(_id) for _id in inserted.inserted_ids]}), 201


if __name__ == "__main__":
    app.run(debug=True)

