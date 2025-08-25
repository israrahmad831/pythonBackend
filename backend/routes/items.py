from flask import Blueprint
from backend.controllers.items_controller import (
    add_item_controller,
    get_items_controller,
    update_item_controller,
    delete_item_controller,
)

items_bp = Blueprint("items", __name__)

# Map endpoints to controller functions
items_bp.route("/items", methods=["GET"])(get_items_controller)
items_bp.route("/items", methods=["POST"])(add_item_controller)
items_bp.route("/items", methods=["PUT"])(update_item_controller)
items_bp.route("/items", methods=["DELETE"])(delete_item_controller)
