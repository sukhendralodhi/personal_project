const { handleUserRegistration, handleUserLogin, handleProfile, handleUserLogout } = require("../controllers/user.controller.js");

const express = require('express');
const { checkForAuthentication } = require("../middlewares/auth.middleware.js");
const checkAuthentication = require("../middlewares/bearer.middleware.js");

const router = express.Router();

router.post('/signup', handleUserRegistration);
router.post('/login', handleUserLogin);
router.get('/profile', checkAuthentication, handleProfile);
router.post('/logout', checkAuthentication, handleUserLogout);

module.exports = router;