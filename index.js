
require("dotenv").config();
const express = require('express');
const auth = require("./routes/auth")
const SocketService = require ('./service/socketService.js');
const app = express();


app.use("/auth", auth);
//connectDB
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/auth");
const chatsRouter = require("./routes/chats");

//middleware
app.use(express.static("./public")); //gör mappen public till static.
app.use(express.json()); //säger att vi använder json i express,

// 1. [GET] - http://address:port/ducks/api/channel/ <-- hämtar en lista över annonserade kanaler.
app.get("/ducks/api/channel/", (request, response) => {

  response.sendStatus(200);
})

// 2.[GET] - http://adress:port/ducks/api/channel/:id <-- 
//hämtar innehållet i en identiferad kanal som tidigare har annonserats ut, detta syftar på meddelanden som har skickats i kanalen.
app.get("/ducks/api/channel/:id", (request, response) => {

  response.sendStatus(200);
});

/*
test/exemple
app.post("/send/:username", (request, response) => {
  const username = request.params.username;
  const message = request.body.message;
  //const channel = request.body.channel;

  SocketService.sendToUser(username, message); // Pass channel as parameter to sendToUser function

  response.sendStatus(200);
});
*/
//testing
app.get("/server", (req, res) => {
  res.send("Chatapp!");
});
app.get("/home", (req, res) => {
  res.send("Chatapp!");
});

//urls
app.use("/chattapp/auth", authRouter);
app.use("/chattapp/chats", chatsRouter);

//server
const port = process.env.PORT || 3000; // Port number to listen on

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Det funkar vi lyssnar på ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();