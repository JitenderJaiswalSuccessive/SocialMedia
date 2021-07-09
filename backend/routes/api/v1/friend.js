const express = require('express');
const router = express.Router();
const friendApi = require("../../../controllers/api/v1/friend_api");
const VerifyToken = require('../../../config/verifytoken');

router.post("/toggle", VerifyToken, friendApi.toggleFriend);

module.exports = router;