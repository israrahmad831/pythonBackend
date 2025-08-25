from flask import request, jsonify
from backend.models.item_model import insert_item, get_all_items, update_item, delete_item
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

# New: Update item controller
from flask import request
def update_item_controller():
    data = request.get_json(silent=True)
    name = data.get("name")
    new_data = data.get("new_data", {})
    if not name or not isinstance(new_data, dict):
        return jsonify({"error": "name and new_data required"}), 400
    count = update_item(name, new_data)
    if count:
        return jsonify({"message": "Item updated"}), 200
    return jsonify({"error": "Item not found"}), 404

# New: Delete item controller
def delete_item_controller():
    data = request.get_json(silent=True)
    name = data.get("name")
    if not name:
        return jsonify({"error": "name required"}), 400
    count = delete_item(name)
    if count:
        return jsonify({"message": "Item deleted"}), 200
    return jsonify({"error": "Item not found"}), 404
