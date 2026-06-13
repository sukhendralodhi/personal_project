const express = require('express');
const { handleGetAllUsers, handleGetUserById } = require('../controllers/admin.controller.js');

const router = express.Router();

router.get('/users', handleGetAllUsers);
router.get('/users/:id', handleGetUserById);

module.exports = router;