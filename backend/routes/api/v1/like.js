const express = require('express');
const router = express.Router();
const likeApi = require("../../../controllers/api/v1/like_api");
const VerifyToken = require('../../../config/verifytoken');

router.post("/toggle", VerifyToken, likeApi.toggleLike);

module.exports = router;