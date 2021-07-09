const express = require('express');
const router = express.Router();
const postApi = require("../../../controllers/api/v1/post_api");
const VerifyToken = require('../../../config/verifytoken');

router.get('/feeds',postApi.feeds);
router.post("/create", VerifyToken, postApi.create);
router.delete('/delete/:id',VerifyToken,postApi.delete);

module.exports = router;