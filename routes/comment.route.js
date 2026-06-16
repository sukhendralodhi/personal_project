const express = require('express');
const { handleGetComments, handleCreateComment } = require('../controllers/comment.controller.js');

const router = express.Router();

router.post("/comments/:blogId", handleCreateComment);
router.get("/comments", handleGetComments)

module.exports = router;