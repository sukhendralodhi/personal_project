const express = require('express');
const { handleCreateBlog, handleGetBlogs } = require('../controllers/blog.controller.js');

const router = express.Router();

// router.post('/blog', checkForAuthentication, handleCreateBlog);
// router.get('/blogs', checkForAuthentication, handleGetBlogs);

router.post('/blog', handleCreateBlog);
router.get('/blogs', handleGetBlogs);

router.get("/check", (req, res) => {
    return res.status(200).json({
        message: "Server working fine"
    })
})

module.exports = router;