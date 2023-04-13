require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const auth = require("./routes/auth");
const SocketService = require("./service/socketService.js");

//connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authetication");

//routers
const authRouter = require("./routes/auth");
const chatsRouter = require("./routes/chats");

//Errorhandler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//Static and json
app.use(express.static("./public")); //gör mappen public till static.
app.use(express.json()); //säger att vi använder json i express,

/*
app.post("/broadcast/:msg", (request, response) => {
  SocketService.broadcast("public", request.params.msg)

  response.sendStatus(200);
});
*/
// 1. [GET] - http://address:port/ducks/api/channel/ <-- hämtar en lista över annonserade kanaler. Se VG kritierier för krav till ett högre betyg.
app.get("/ducks/api/channel/", (request, response) => {
  const channels = SocketService.getAllChannels();

  response.status(200).json(channels);
});
//[GET] - http://adress:port/ducks/api/channel/:id <--
//hämtar innehållet i en identiferad kanal som tidigare har annonserats ut, detta syftar på meddelanden som har skickats i kanalen.
app.get("/ducks/api/channel/:id", (request, response) => {
  const channelId = request.params.id;
  // Use channelId to fetch messages from the corresponding channel using SocketService
  // and send the response back
  // Example: const messages = SocketService.getMessages(channelId);
  //          response.status(200).json(messages);
});

app.post("/send/:username", (request, response) => {
  const username = request.params.username;
  const message = request.body.message;
  const channel = request.body.channel; // Add channel parameter to request body

  SocketService.sendToUser(username, channel, message); // Pass channel as parameter to sendToUser function

  response.sendStatus(200);
});

//routes
app.use("/chattapp/auth", authRouter);
app.use("/chattapp/chats", authenticateUser, chatsRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use("/auth", auth);

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
