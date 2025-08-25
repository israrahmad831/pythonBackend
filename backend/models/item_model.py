from backend.config.db import db

items = db["items"]

def insert_item(item: dict):
    # item: {name, description, price(float)}
    res = items.insert_one(item)
    return str(res.inserted_id)

def get_all_items():
    docs = list(items.find({}, {"_id": 0}))  # hide _id for simplicity
    return docs
