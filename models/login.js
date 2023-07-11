const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const loginSchema = new mongoose.Schema(
    {  
        id: {
        type: String,
        required: true,
        },

        pw: {
            type: String,
            required : true,
        },
    }
)


const Login = mongoose.model('Login', loginSchema)


module.exports = Login;