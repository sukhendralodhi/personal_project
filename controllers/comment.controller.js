const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

async function handleCreateComment(req, res) {
    try {
        const { content } = req.body;
        const { blogId } = req.params;

        // console.log("conent", content);
        // console.log("blogId", blogId);

        // console.log("user", req.user);

        if (!content) {
            return res.status(400).json({
                message: "Comment content is required"
            });
        }

        if (!blogId) {
            return res.status(400).json({
                message: "Blog id is required"
            });
        }

        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        const checkComment = await Comment.findOne({
            author: req.user.id,
            blog: blogId
        });

        if (checkComment) {
            return res.status(400).json({
                message: "You have already commented on this blog"
            });
        }

        const comment = await Comment.create({
            content: content,
            author: req.user.id,
            blog: blogId
        });

        return res.status(201).json({
            message: "Comment added successfully",
            data: comment
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error"
        })
    }
}

async function handleGetComments(req, res) {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find(
            { blog: blogId }
        ).populate("author", "name")
            .sort({ createdAt: -1 });

        if (comments.length === 0) {
            return res.status(404).json({
                message: "There is no comments for that blog"
            })
        }

        return res.status(200).json({
            message: "Comments fetched succesfully",
            data: comments
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server error"
        })
    }
}

module.exports = {
    handleCreateComment,
    handleGetComments
}