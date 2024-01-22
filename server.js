require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const http = require('http')
const socketIo = require('socket.io');
const cors = require("cors");
const corsOptions = require("./config/corsOptions")
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require('./middleware/verifyJWT')
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConnection')
const cookieParser = require('cookie-parser');
const Chat = require('./models/Chat')
const ChatHistory = require('./models/ChatHistory')
const {Wit} = require('node-wit')
const generateReplyFromIntent = require('./services/generateReplyFromIntent')
const PORT = process.env.PORT || 3600;
const server = http.createServer(app);

const io = socketIo(server,{
  cors : {
        origin:process.env.NODE_ENV === "production" ? false : ["http://localhost:5173","http://127.0.0.1:5500"]
  }
  
});

//CONNECT TO MONGO DB

connectDb();

//CUSTOM MIDDLEWARE LOGGER

app.use(logger);
//CORS
// Handle Options credentials check -  before CORS
app.use(credentials)

//CORS Cross origin resourse sharing
app.use(cors(corsOptions));
//middleware to handle url encoding
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser())

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.use('/', require('./routes/home'))
app.use('/register',require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT)
app.use('/students', require('./routes/students'));
app.use('/chat', require('./routes/chat'));
app.use('/history', require('./routes/history'));


app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not Found" });
  } else {
    res.type("txt").send("404 not Found");
  }
});

app.use(errorHandler);


mongoose.connection.once('open', ()=>{
  console.log('Connected to MongoDB');
 server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
})

//wit client

const witClient = new Wit({ accessToken: `${process.env.WIT_AI_TOKEN}`});

io.on('connection',(socket)=>{

  console.log('New client connected');

  socket.on('message', async (data)=>{

    const {userId, message, historyId} = data;

    console.log(data);

    try{
      const witResponse = await witClient.message(message);
      // await axios.get(`https://api.wit.ai/message?v=20231113&q=${encodeURIComponent(message)}`,{
      //   headers: { 'Authorization': `Bearer ${process.env.WIT_AI_TOKEN}` }
      // });

      console.log(witResponse);

      const chatReply = generateReplyFromIntent(
        witResponse.intents.length > 0 ? witResponse.intents : null
    );
    
      console.log(chatReply);

      const chat = new Chat({
        message: message,
        response : chatReply,
        userId: userId
      });

      await chat.save();

      const history = await ChatHistory.findOne({_id:historyId})

      history.chats.push(chat);
      await history.save();

      io.emit('response',{ message, response: chatReply, userId})
    }
    catch(error){

      socket.emit('error', error.message);
    }
  });

 socket.on('disconnect',()=>{

  console.log('Client disconnected');

 });

})


