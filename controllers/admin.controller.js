const User = require("../models/user.model.js");

async function handleGetAllUsers(req, res) {
    // console.log("Admin Access - Fetching all users", req.user); // Debugging log
    try {
        const users = await User.find().select("-password");

        return res.status(200).json({
            message: "Users fetched successfully",
            data: users
        });

    } catch (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function handleGetUserById(req, res) {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            data: user
        });

    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById
}