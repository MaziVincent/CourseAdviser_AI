
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatHistorySchema = new Schema({
    name:String,
    chats:[{type:Schema.Types.ObjectId, ref:'Chat'}],
    timestamp:{ type: Date, default: Date.now },
    userId:{type : Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('ChatHistory', ChatHistorySchema);