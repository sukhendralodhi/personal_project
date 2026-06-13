const User = require("../models/user.model.js");

async function handleProfile(req, res) {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User fetch successfully",
            data: {
                userName: user.name,
                userEmail: user.email,
                userRole: user.role
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    handleProfile
}