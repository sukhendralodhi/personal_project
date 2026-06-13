const { handleUserRegistration, handleUserLogin } = require("../controllers/auth.controller.js");

const express = require('express');

const router = express.Router();

router.post('/signup', handleUserRegistration);
router.post('/login', handleUserLogin);
// router.post('/logout', handleUserLogout);

module.exports = router;