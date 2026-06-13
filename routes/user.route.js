const express = require('express');
const { handleProfile } = require('../controllers/user.controller.js');
const { checkRestrictedAccess } = require('../middlewares/bearer.middleware.js');

const router = express.Router();

router.get('/profile', handleProfile);

module.exports = router;