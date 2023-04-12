const { Server } = require("socket.io");

const options = {
  cors: {
    origin: "*",
  },
};

let io = undefined;
let clients = [];
let Channels = {};

function getAllChannels() {
  return Object.keys(Channels);
}

function handleNewConnection(clientSocket, channel) {
  // 1. Save client sockets for broadcasts via REST API
  clients.push(clientSocket);

  clientSocket.username = clientSocket.handshake.headers.username;

  // 2. Remove the client from the list when the client's connection is disconnected
  clientSocket.on("disconnect", () => {
    clients = clients.filter((client) => client != clientSocket);

    // Remove the client from the corresponding channel
    if (Channels[channel]) {
      Channels[channel] = Channels[channel].filter(
        (client) => client !== clientSocket
      );
    }
  });

  // Add the client to the corresponding channel
  if (Channels[channel]) {
    Channels[channel].push(clientSocket);
  } else {
    Channels[channel] = [clientSocket];
  }
}

// Function to broadcast a message to all clients in a channel
function broadcast(channel, message) {
  if (Channels[channel]) {
    Channels[channel].forEach((client) => client.emit(channel, message));
  }
}

/*
// Function to send a private message to a specific user in a channel
function sendToUser(username, message) {
  if (Channels[channel]) {
    const matchedClients = Channels[channel].filter(client => client.username === username);
    matchedClients.forEach(client => client.emit(message));
    const matchedClients = Channels[channel].filter(
      (client) => client.username === username
    );
    matchedClients.forEach((client) => client.emit(channel, message));
  }
}
*/

// Function to attach socket.io to a container with a specific channel
function attach(container, channel) {
  io = new Server(container, options);
  io.of(channel).on("connection", (clientSocket) => {
    handleNewConnection(clientSocket, channel);
  });
}

const channel = "myChannel";
const message = "Hello everyone!";
broadcast(channel, message);

module.exports = { broadcast, attach, getAllChannels};
