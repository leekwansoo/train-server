from pymongo import MongoClient
from bson.objectid import ObjectId

from model import *
from login import Login
import motor.motor_asyncio
from dotenv import dotenv_values
import os

config = dotenv_values(".env")
DATABASE_URI = config.get("DATABASE_URI")
if os.getenv("DATABASE_URI"): 
    DATABASE_URI = os.getenv("DATABASE_URI") #ensures that if we have a system environment variable, it uses that instead

client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI)

database = client.todoapp

user_collection = database.logins

async def list_all_users():
    users = []
    cursor = user_collection.find({})
    async for doc in cursor:
        login = Login(**doc)
        users.append(login)
    return users

async def find_user(login):
    doc = await user_collection.find_one({"id": id})
    print(doc)
    return doc

async def create_user(user):
    print(user)
    result = await user_collection.insert_one(user)
    return result


async def delete_user(id):
    doc = await user_collection.find_one({"id": id}, {"_id": 0})
    print(doc)
    return doc