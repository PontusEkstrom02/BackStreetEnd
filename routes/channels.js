const express = require("express");
const router = express.Router();

const {
  CreateChannel,
  GetAllChannels,
  GetAllMessages,
  PostInChannel,
  DeleteChannel,
} = require("../controllers/channel");

router.route("/").put(CreateChannel).get(GetAllChannels);
router.route("/:id").post(PostInChannel).delete(DeleteChannel).get(GetAllMessages);

module.exports = router;
