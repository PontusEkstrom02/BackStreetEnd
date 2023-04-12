import express from 'express';
//const express = require('express');

import { createServer } from 'http';
//const { createServer } = require('http');

import SocketService from './service/socketService.js';


const app = express();
const httpServer = createServer(app);

app.use(express.json());


SocketService.attach(httpServer);

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
});



httpServer.listen(20020, () => console.log("Server started..."));
