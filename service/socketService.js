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

// Create broadcast
channels["broadcast"] = { messages: [] };
// Function to send a message to a specific channel
function sendMessageToChannel(channelId, message) {
  // Check if the channel exists
  if (channels[channelId]) {
    // Add the new message to the channel
    channels[channelId].messages.push(message);
  }
}

module.exports = {sendMessageToChannel, channels, io};