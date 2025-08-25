from pymongo import MongoClient
from backend.config.setting import MONGODB_URI, MONGODB_DB

_client = MongoClient(MONGODB_URI)
db = _client[MONGODB_DB]
