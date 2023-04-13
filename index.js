require("dotenv").config();
const express = require("express");
const SocketService = require("./service/socketService.js");
require("express-async-errors");
const app = express();

//connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authetication");

//routers
const authRouter = require("./routes/auth");
const chatsRouter = require("./routes/channels.js");

//Errorhandler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//Static and json
app.use(express.static("./public")); //gör mappen public till static.
app.use(express.json()); //säger att vi använder json i express,

/*1. [GET] - http://address:port/ducks/api/channel/
     hämtar en lista över annonserade kanaler.*/
app.get("/ducks/api/channel", (req, res) => {
  const channelList = Object.keys(SocketService.channels);
  res.json({ channels: channelList });
});

/*2.[GET] - http://adress:port/ducks/api/channel/:id
   hämtar innehållet i en identiferad kanal som tidigare har annonserats ut, 
   detta syftar på meddelanden som har skickats i kanalen.*/
app.get("/ducks/api/channel/:id", (req, res) => {
  let channelId = req.params.id;

  // Check if the channel exists
  if (SocketService.channels[channelId]) {
    // Return the messages in the channel
    let messages = SocketService.channels[channelId].messages;
    res.json({ messages: messages });
  } else {
    // Channel not found
    res.status(404).json({ error: "Channel not found" });
  }
});

/*3. [PUT] - http://address:port/ducks/api/channel/
     skapar en ny kanal. Tema (rubrik) på kanalen ska skickas som en del http-body:n, 
     förslagvis som del av ett json objekt.*/
app.put("/ducks/api/channel", (req, res) => {
  // Generate a new channel ID
  let channelId = req.body.name;

  // Create a new channel object with an empty array for messages
  SocketService.channels[channelId] = { messages: [] };

  // Return the channel ID as the response
  res.json({ channelId: channelId });
});

/*4.[POST] - http://adress:port/ducks/api/channel/:id
    skickar ut ett nytt meddelanden till en identiferad kanal som tidigare har annonserats ut. 
    Innehållet i ett meddlande bör vara minst anvsändare och innehåll.*/
app.post("/ducks/api/channel/:id", (req, res) => {
  const channelId = req.params.id;
  const { username, content } = req.body; // assuming the request body contains user and content for the message

  // Check if the channel exists
  if (SocketService.channels[channelId]) {
    // Add the new message to the channel
    const newMessage = { username, content };
    SocketService.channels[channelId].messages.push(newMessage);

    // Emit the new message to all connected clients in the channel
    SocketService.io.to(channelId).emit("message", newMessage);

    res.sendStatus(200);
  } else {
    // Channel not found
    res.status(404).json({ error: "Channel not found" });
  }
});

/*5.[DELETE] - http://adress:port/ducks/api/channel/:id
tar bort en identiferad kanal som tidigare annonserats ut.*/
app.delete("/ducks/api/channel/:id", (req, res) => {
  const channelId = req.params.id;

  // Check if the channel exists
  if (SocketService.channels[channelId]) {
    // Delete the channel
    delete SocketService.channels[channelId];

    // Emit a channelDeleted event to all connected clients
    SocketService.io.emit("channelDeleted", channelId);

    res.sendStatus(200);
  } else {
    // Channel not found
    res.status(404).json({ error: "Channel not found" });
  }
});

/*6.[GET] - http://adress:port/ducks/api/broadcast/
hämtar en lista över alla händelser som har skickats ut, ex. älgvandring, traffikolycker m.m.*/
app.get("/ducks/api/broadcast/", (req, res) => {
  let channelId = "broadcast";

  // Check if the channel exists
  if (SocketService.channels[channelId]) {
    // Return the messages in the channel
    let messages = SocketService.channels[channelId].messages;
    res.json({ messages: messages });
  } else {
    res.status(404).json({ error: "Channel not found" });
  }
});

/*7. [POST] - http://adress:port/ducks/api/broadcast/
skapar en ny nödhändelse. Detta anrop ska kräva ett giltigt JWT token.*/
app.post("/ducks/api/broadcast/", (req, res) => {
  const channelId = "broadcast";
  const { username, content } = req.body; // assuming the request body contains user and content for the message

  // Check if the channel exists
  if (SocketService.channels[channelId]) {
    // Add the new message to the channel
    const newMessage = { username, content };
    SocketService.channels[channelId].messages.push(newMessage);

    // Emit the new message to all connected clients in the channel
    SocketService.io.to(channelId).emit("message", newMessage);

    res.sendStatus(200);
  } else {
    // Channel not found
    res.status(404).json({ error: "Channel not found" });
  }
});


//urls
app.use("/ducks/api/auth", authRouter);
app.use("/ducks/api/chats", authenticateUser, chatsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
