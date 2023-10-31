var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    name: { type: String, default: datestring + " List" }
});

const List = mongoose.model('List', listSchema)
module.exports = List;