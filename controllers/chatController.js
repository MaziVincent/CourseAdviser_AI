
const ChatHistory = require('../models/ChatHistory');


const handleChatHistoryCreate = async (req, res) =>{

    console.log(req.body)
    if(!req.body.userId){
        return res.status(400).json({'message':'user ID required'});
    }
    const chatHistory = await ChatHistory.create({
        name:`Chat History (${Date.now()})`,
        userId: req.body.userId
    });

    res.status(201).json({chatHistory})


}

const updateChatHistory = async (req, res) => {

    if(!req.body._id) return res.status(400).json({'message':'ID is required'});
    const recentChatHistory = await ChatHistory.findOne({_id:req.body._id}).exec();
    recentChatHistory.chats.push(req.body.chat);
    res.status(200)

      
}

const getAllHistory = async (req, res) => {

    if(!req.params?.id) return res.status(400).json({'message':'ID is required'});
    const allHistory = await ChatHistory.find({userId:req.params?.id}).exec();

    res.status(200).json({allHistory});
}

const getChatHistory = async (req, res)=> {

    if(!req.params?.id) return res.status(400).json({'message': 'ID is required'});
    const chatHistory = await ChatHistory.findOne({_id:req.params?.id}).populate("chats").exec();

    //console.log(chatHistory);

    res.status(200).json({chatHistory});
    
}

module.exports = {getAllHistory, updateChatHistory, handleChatHistoryCreate, getChatHistory
}