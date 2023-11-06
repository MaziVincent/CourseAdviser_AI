
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    studentId:{
        type: String,
        
    },
    phoneNumber:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    roles:{
        Admin: String,
        Student: String
        
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);