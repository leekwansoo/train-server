const{ObjectId} = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const mongoose = require("mongoose");
const Train = require("./models/trainModel")
const Login = require("./models/login")

mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://admin:james@cluster0.ujzjm.mongodb.net/todoapp?retryWrites=true&w=majority");

client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI)

database = client.todoapp

user_collection = database.logins
train_collection = database.trains


function fetch_all_trains() {
    
    const trains = train_collection.findAll({})
       
    return trains
}

async function fetch_one_train(id) {
    const train = await train_collection.find_one({"id": id})
    return train
}

async function create_train(data) {
    console.log(data)
    const train = await train_collection.insert_one(data)
    if (!train) { return ("no data exist")}
    return train
}

async function change_train(train){
    console.log(train)
    id = train.id
    title = train.title
    desc = train.desc
    checked = train.checked
    await train_collection.update_one({"id": id}, {"$set": {"title": title, "desc": desc, "checked": checked}})
    const train = await fetch_one_train(id)
    return train
}

async function delete_train(id) {
    await train_collection.delete_one({"id": id})
    return ("deleted")
}