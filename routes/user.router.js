const { handleUserRegistration, handleUserLogin, handleProfile, handleUserLogout } = require("../controllers/user.controller.js");

const express = require('express');
const { checkForAuthentication } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post('/signup', handleUserRegistration);
router.post('/login', handleUserLogin);
router.get('/profile', checkForAuthentication, handleProfile);
router.post('/logout', checkForAuthentication, handleUserLogout);

module.exports = router;