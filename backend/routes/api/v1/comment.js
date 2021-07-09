const express = require('express');
const router = express.Router();
const commentApi = require("../../../controllers/api/v1/post_api");
const VerifyToken = require('../../../config/verifytoken');

router.post("/create", VerifyToken, commentApi.create);
router.delete('/delete/:id',VerifyToken,commentApi.delete);

module.exports = router;