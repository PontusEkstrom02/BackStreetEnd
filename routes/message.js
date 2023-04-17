const express = require("express");
const router = express.Router();

const {
  createMessage,
  getAllMessages,
  getAllMessagesInBroadcast,
} = require("../controllers/message");

router.route("/broadcast").get(getAllMessagesInBroadcast);
router.route("/channel/:id").get(getAllMessages);
router.route("/channel/:id").post(createMessage);

module.exports = router;
