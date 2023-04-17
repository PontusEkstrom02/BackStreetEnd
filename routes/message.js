const express = require("express");
const router = express.Router();

const { createMessage, getAllMessages, createMessageInBroadcast, getAllMessagesInBroadcast} = require("../controllers/message");

router.route("broadcast").get(getAllMessagesInBroadcast).post(createMessageInBroadcast);
router.route("channel/:id").get(getAllMessages);
router.route("channel/:id").post(createMessage);

module.exports = router;
