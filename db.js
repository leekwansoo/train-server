const mongoose = require('mongoose')

const dbUri = "mongodb+srv://admin:james@cluster0.ujzjm.mongodb.net/taskapp?retryWrites=true&w=majority"

module.exports = ( ) => {
    return mongoose.connect(dbUri)
}