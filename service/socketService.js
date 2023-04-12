const { Server } = require('socket.io');

const options = {
  cors: {
    origin: "*"
  }
}



let io = undefined;
let clients = [];
let Channels = [];
/*
function getAllChannels(){
  Channels = 
}
*/
function handleNewConnection(clientSocket) {
  // 1. Sparar client sockets för ex. broadcasts via rest anrop
  clients.push(clientSocket);

  clientSocket.username = clientSocket.handshake.headers.username;

  // 2. Plockar bort klienten från listan när anslutningen för klienten avbryts
  clientSocket.on("disconnect", () => {
    clients = clients.filter(client => client != clientSocket);
  });
}

function sendToUser(username, message) {
  const matchedClients = clients.filter(client => client.username == username);
  matchedClients.forEach(client => client.emit("private", message));
  
  
//const client = clients.find(client => client.username == username);
//client.emit("private", message); // skickar endast till EN klient
}

function sendChatsToUser(username){
  // fix change username to key
  const client = clients.find(client => client.username == username);
  client.emit("private", message); // skickar endast till EN klient
}

function broadcast(channel, message) {
  io.emit(channel, message); //broadcastar till alla på socket servern
}

function attach(container) {
  io = new Server(container, options);
  io.on("connection", handleNewConnection);
}

export default { broadcast, attach, sendToUser }