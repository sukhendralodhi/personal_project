const express = require('express');
const { handleGetAllUsers, handleGetUserById, handleDeleteUserById, handleEditUserById } = require('../controllers/admin.controller.js');

const router = express.Router();

router.get('/users', handleGetAllUsers);
router.get('/users/:id', handleGetUserById);
router.delete('/users/:id', handleDeleteUserById);
router.put('/users/:id', handleEditUserById);

module.exports = router;