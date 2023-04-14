const SocketService = require("../service/socketService.js");


/*1. [GET] - http://address:port/ducks/api/channel/
     hämtar en lista över annonserade kanaler.*/
const GetAllChannels = async (req, res) => {
  const channelList = Object.keys(SocketService.channels);
  res.json({ channels: channelList });
};

/*2.[GET] - http://adress:port/ducks/api/channel/:id
  hämtar innehållet i en identiferad kanal som tidigare har annonserats ut, 
  detta syftar på meddelanden som har skickats i kanalen.*/
const GetAllMessages = async (req, res) => {
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
};


/*3. [PUT] - http://address:port/ducks/api/channel/
  skapar en ny kanal. Tema (rubrik) på kanalen ska skickas som en del http-body:n, 
  förslagvis som del av ett json objekt.*/
const CreateChannel = async (req, res) => {
  // Generate a new channel ID
  let channelId = req.body.name;

  // Create a new channel object with an empty array for messages
  SocketService.channels[channelId] = { messages: [] };

  // Return the channel ID as the response
  res.json({ channelId: channelId });
};

/*4.[POST] - http://adress:port/ducks/api/channel/:id
  skickar ut ett nytt meddelanden till en identiferad kanal som tidigare har annonserats ut. 
  Innehållet i ett meddlande bör vara minst anvsändare och innehåll.*/
const PostInChannel = async (req, res) => {
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
};

/*5.[DELETE] - http://adress:port/ducks/api/channel/:id
tar bort en identiferad kanal som tidigare annonserats ut.*/
const DeleteChannel = async (req, res) => {
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
};

module.exports = {
  CreateChannel,
  GetAllChannels,
  PostInChannel,
  DeleteChannel,
  GetAllMessages,
};
