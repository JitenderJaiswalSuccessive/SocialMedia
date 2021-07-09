const express = require('express');
const router = express.Router();
const userApi = require("../../../controllers/api/v1/user_api");
const VerifyToken = require('../../../config/verifytoken');

router.post("/signup", userApi.signUp);
router.post("/signin", userApi.signIn);
router.get("/profile/:id", VerifyToken, userApi.profile);
router.post("/update/:id", VerifyToken, userApi.update);
router.get("/allusers", userApi.allUsers);

module.exports = router;