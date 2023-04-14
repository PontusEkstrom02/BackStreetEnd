const SocketService = require("../service/socketService.js");

/*6.[GET] - http://adress:port/ducks/api/broadcast/
hämtar en lista över alla händelser som har skickats ut, ex. älgvandring, traffikolycker m.m.*/
const GetBroadcast = async (req, res) => {
  let channelId = "broadcast";

  // Check if the channel exists
  if (SocketService.channels[channelId]) {
    // Return the messages in the channel
    let messages = SocketService.channels[channelId].messages;
    res.json({ messages: messages });
  } else {
    res.status(404).json({ error: "Channel not found" });
  }
};

/*7. [POST] - http://adress:port/ducks/api/broadcast/
skapar en ny nödhändelse. Detta anrop ska kräva ett giltigt JWT token.*/
const CreateBroadcastPost = async (req, res) => {
  const channelId = "broadcast";
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


module.exports = {
    GetBroadcast,
    CreateBroadcastPost,
};
  