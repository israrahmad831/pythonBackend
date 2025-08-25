from flask import request, jsonify
from backend.models.item_model import insert_item, get_all_items
from backend.utils.validators import validate_item_payload

def add_item_controller():
    data = request.get_json(silent=True)
    errors = validate_item_payload(data or {})
    if errors:
        return jsonify({"errors": errors}), 400

    # Normalize data
    item = {
        "name": data["name"].strip(),
        "description": data["description"].strip(),
        "price": float(data["price"])
    }
    insert_item(item)
    return jsonify({"message": "Item added successfully"}), 201

def get_items_controller():
    items = get_all_items()
    return jsonify(items), 200
