from backend.config.db import db

items = db["items"]

def insert_item(item: dict):
    # item: {name, description, price(float)}
    res = items.insert_one(item)
    return str(res.inserted_id)

def get_all_items():
    docs = list(items.find({}, {"_id": 0}))  # hide _id for simplicity
    return docs

# New: Update item by name (for demo, real apps should use _id)
def update_item(name, new_data):
    res = items.update_one({"name": name}, {"$set": new_data})
    return res.modified_count

# New: Delete item by name (for demo, real apps should use _id)
def delete_item(name):
    res = items.delete_one({"name": name})
    return res.deleted_count
