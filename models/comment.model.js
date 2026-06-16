const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            required: true,
        }
    }, { timestamps: true }
);

commentSchema.index(
    { author: 1, blog: 1 },
    { unique: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;