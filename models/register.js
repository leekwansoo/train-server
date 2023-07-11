const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const registerSchema = new mongoose.Schema(
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


const Register = mongoose.model('Register', registerSchema)


module.exports = Register;