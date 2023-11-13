
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    message: String,
    response: String,
    timestamp:{ type: Date, default: Date.now },
    userId:{type : Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Chat', ChatSchema);
