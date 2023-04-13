const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

// Create express app
const app = express();
const server = http.createServer(app);

// Attach Socket.io to the server
const io = socketIO(server);

// Data structure to store channels and messages
let channels = {};

// Function to handle new connections
function handleNewConnection(clientSocket) {
  console.log(`Client connected with ID: ${clientSocket.id}`);

  // Send a welcome message to the connected client
  clientSocket.emit("message", "Welcome to the chat!");

  // Event listener for joinChannel event
  clientSocket.on("joinChannel", (channelId) => {
    // Leave the current channel (if any)
    const currentChannelId = clientSocket.channelId;
    if (currentChannelId) {
      clientSocket.leave(currentChannelId);
    }

    // Join the new channel
    clientSocket.join(channelId);
    clientSocket.channelId = channelId;
    console.log(`Client ${clientSocket.id} joined channel with ID: ${channelId}`);
  });

  // Event listener for sendMessage event
  clientSocket.on("sendMessage", (message) => {
    // Get the current channel ID
    const channelId = clientSocket.channelId;

    // Send the message to the current channel
    if (channelId) {
      sendMessageToChannel(channelId, message);
    }
  });

  // Event listener for disconnect event
  clientSocket.on("disconnect", () => {
    console.log(`Client disconnected with ID: ${clientSocket.id}`);

    // Leave the current channel (if any)
    const currentChannelId = clientSocket.channelId;
    if (currentChannelId) {
      clientSocket.leave(currentChannelId);
      //idk
      handleChannelDeleted(currentChannelId);
    }
  });
}

// Function to send a message to a specific channel
function sendMessageToChannel(channelId, message) {
  // Check if the channel exists
  if (channels[channelId]) {
    // Add the new message to the channel
    channels[channelId].messages.push(message);

    // Emit the new message to all connected clients in the channel
    io.to(channelId).emit("message", message);
  }
}

// Function to handle channelDeleted event
function handleChannelDeleted(channelId) {
  // Emit the channelDeleted event to all connected clients
  io.emit("channelDeleted", channelId);
}

// Set up event listener for new connections
io.on("connection", handleNewConnection);


module.exports = {handleNewConnection, sendMessageToChannel, handleChannelDeleted, channels, io};