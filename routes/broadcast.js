const express = require("express");
const router = express.Router();

const {
    GetBroadcast,
    CreateBroadcastPost,
  } = require("../controllers/broadcast");
  
  router.route("/").post(CreateBroadcastPost).get(GetBroadcast);
  
  module.exports = router;