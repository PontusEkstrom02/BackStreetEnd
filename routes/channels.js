const express = require("express");
const router = express.Router();

const {
  CreateChannel,
  GetAllChannels,
  GetThisChannel,
  // PostInChannel,
  DeleteChannel,
} = require("../controllers/channel");

router.route("/").put(CreateChannel).get(GetAllChannels);
router
  .route("/:id")
  // .post(PostInChannel)
  .delete(DeleteChannel)
  .get(GetThisChannel);

module.exports = router;
