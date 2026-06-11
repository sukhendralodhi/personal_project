const express = require('express');
const { handleCreateBlog, handleGetBlogs } = require('../controllers/blog.controller.js');
const { checkForAuthentication } = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.post('/blog', checkForAuthentication, handleCreateBlog);
router.get('/blogs', checkForAuthentication, handleGetBlogs);

router.get("/check", (req, res) => {
    return res.status(200).json({
        message: "Server working fine"
    })
})

module.exports = router;