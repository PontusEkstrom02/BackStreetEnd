require("dotenv").config();
const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/auth");
const chatsRouter = require("./routes/chats");

//middleware
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
})
//[GET] - http://adress:port/ducks/api/channel/:id <-- 
//hämtar innehållet i en identiferad kanal som tidigare har annonserats ut, detta syftar på meddelanden som har skickats i kanalen.
app.get("/ducks/api/channel/:id", (request, response) => {
  const channels = SocketService.getAllChannels();

  response.status(200).json(channels);
})

app.post("/send/:username", (request, response) => {
  const username = request.params.username;
  const message = request.body.message;

  SocketService.sendToUser(username, message);

  response.sendStatus(200);
//testing
app.get("/home", (req, res) => {
  res.send("Chatapp!");
});

//urls
app.use("/chattapp/auth", authRouter);
app.use("/chattapp/chats", chatsRouter);

//server
const port = process.env.PORT || 3000; // Port number to listen on

httpServer.listen(20020, () => console.log("Server started..."));
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Det funkar vi lyssnar på ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
