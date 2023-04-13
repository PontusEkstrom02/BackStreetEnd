const express = require("express");
const router = express.Router();

const {
  CreateChannel,
  GetAllChannels,
  PostInChannel,
  DeleteChannel,
} = require("../controllers/channel");

router.route("/").post(CreateChannel).get(GetAllChannels);
router.route("/:id").patch(PostInChannel).delete(DeleteChannel);

module.exports = router;
