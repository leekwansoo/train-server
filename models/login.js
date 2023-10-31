const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const loginSchema = new mongoose.Schema(
    {  
        user: {
        type: String,
        required: true,
        },

        pw: {
            type: String,
            required : true,
        },
        email: {
            type: String,
            required : false,
        },
        age: {
            type: Number,
            required : false,
        },
        trainItems: {
            type: Array,
            required : false,
        },
    }
)


const Login = mongoose.model('Login', loginSchema)


module.exports = Login;