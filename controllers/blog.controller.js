const Blog = require("../models/blog.model");

async function handleCreateBlog(req, res) {
    try {
        const { title, description, coverImage } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (!description) {
            return res.status(400).json({
                message: "Description is required"
            });
        }

        const existingBlog = await Blog.findOne({ title });
        if (existingBlog) {
            return res.status(400).json({
                message: "A blog with this title already exists"
            });
        }

        const newBlog = await Blog.create({
            title,
            description,
            coverImage,
            author: req.user.id
        });

        return res.status(201).json({
            message: "Blog created successfully",
            data: newBlog
        });

    } catch (error) {
        console.error("Create Blog Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function handleGetBlogs(req, res) {
    try {

        // console.log("Fetching blogs for user:", req.user.id);

        const blogs = await Blog.find({ author: req.user.id });

        // console.log("Blogs fetched:", blogs);

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({
                message: "No blogs found for this user"
            });
        }

        return res.status(200).json({
            message: "Blogs fetched successfully",
            data: blogs
        });

    } catch (error) {
        console.error("Get Blogs Error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    handleCreateBlog,
    handleGetBlogs
};