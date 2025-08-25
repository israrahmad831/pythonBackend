from flask import Blueprint
from backend.controllers.items_controller import (
    add_item_controller,
    get_items_controller,
)

items_bp = Blueprint("items", __name__)

# Map endpoints to controller functions
items_bp.route("/items", methods=["GET"])(get_items_controller)
items_bp.route("/items", methods=["POST"])(add_item_controller)
