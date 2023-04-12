
const express = require('express');

const auth = require("./routes/auth")

const { createServer } = require('http');

const SocketService = require ('./service/socketService.js');




const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use("/auth", auth);


SocketService.attach(httpServer);

/*
app.post("/broadcast/:msg", (request, response) => {
  SocketService.broadcast("public", request.params.msg)

  response.sendStatus(200);
});
*/
// 1. [GET] - http://address:port/ducks/api/channel/ <-- hämtar en lista över annonserade kanaler. Se VG kritierier för krav till ett högre betyg.
app.get("/ducks/api/channel/", (request, response) => {
  SocketService.broadcast("chats", request.params.msg)

  response.sendStatus(200);
})

app.post("/send/:username", (request, response) => {
  const username = request.params.username;
  const message = request.body.message;

  SocketService.sendToUser(username, message);

  response.sendStatus(200);
});

app.listen(5000, () => {
  console.log("Now running on port 5000")
})

httpServer.listen(20020, () => console.log("Server started..."));
