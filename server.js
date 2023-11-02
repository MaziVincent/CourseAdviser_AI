const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions")
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3600;

//CUSTOM MIDDLEWARE LOGGER

app.use(logger);
//CORS

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

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
