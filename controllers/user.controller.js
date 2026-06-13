const Blog = require("../models/blog.model.js");
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

async function handleEditProfile(req, res) {
    try {

        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User profile updated successfully",
            data: {
                userName: user.name,
                userEmail: user.email,
                userRole: user.role
            }
        });

    } catch (error) {
        console.error("Edit Profile Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function handleChangePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(400).json({
                message: "Current password is incorrect"
            });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error("Change Password Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

async function handleDeleteAccount(req, res) {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await Blog.deleteMany({ author: userId });
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            message: "User account deleted successfully"
        });

    } catch (error) {
        console.error("Delete Account Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

module.exports = {
    handleProfile,
    handleEditProfile,
    handleDeleteAccount
}