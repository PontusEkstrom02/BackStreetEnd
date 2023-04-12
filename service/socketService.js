const { Server } = require("socket.io");

const options = {
  cors: {
    origin: "*",
  },
};

let io = undefined;
let clients = [];
let currentChannel = "default"; // Default channel for new connections

function handleNewConnection(clientSocket) {
  // 1. Save client sockets for broadcasts via REST API
  clients.push(clientSocket);

  clientSocket.username = clientSocket.handshake.headers.username;
  clientSocket.channel = currentChannel; // Assign the current channel to the client

  // 2. Remove the client from the list when the client's connection is disconnected
  clientSocket.on("disconnect", () => {
    clients = clients.filter((client) => client != clientSocket);

    // Remove the client from the corresponding channel
    broadcast(clientSocket.channel, {
      type: "user_leave",
      username: clientSocket.username,
    });
  });

  // 3. Custom event handler for handling channel changes
  clientSocket.on("changeChannel", (newChannel) => {
    handleChangeChannel(clientSocket, newChannel);
  });
}

function handleChangeChannel(clientSocket, newChannel) {
  const oldChannel = clientSocket.channel;
  clientSocket.channel = newChannel;

  // Broadcast user leave event to old channel
  broadcast(oldChannel, {
    type: "user_leave",
    username: clientSocket.username,
  });

  // Broadcast user join event to new channel
  broadcast(newChannel, {
    type: "user_join",
    username: clientSocket.username,
  });
}

function getChannels() {
  // You can implement logic to retrieve channels here
  // For example, return an array of channel names
}

// Function to broadcast a message to all clients in a channel
function broadcast(channel, message) {
  io.emit(channel, message);
}

// Function to attach socket.io to a container with a specific channel
function attach(container) {
  io = new Server(container, options);
  io.on("connection", (clientSocket) => {
    handleNewConnection(clientSocket);
  });
}

module.exports = { broadcast, attach, handleChangeChannel, getChannels };
