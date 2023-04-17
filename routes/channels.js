const express = require("express");
const router = express.Router();

const {
  CreateChannel,
  GetAllChannels,
  DeleteChannel,
} = require("../controllers/channel");

router.route("/").put(CreateChannel).get(GetAllChannels);
router.route("/:id").delete(DeleteChannel);

module.exports = router;
