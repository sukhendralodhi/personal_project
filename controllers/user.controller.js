const User = require("../models/user.model");
const { generateToken } = require("../utils/auth.js");
const { hashPassword, verifyPassword } = require("../utils/hash.password.js");

async function handleUserRegistration(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email",
            });
        }

        const hashedPassword = await hashPassword(password);
        console.log("Hashed Password:", hashedPassword);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully",
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordValid = await verifyPassword(password, user?.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        console.log(user)

        const token = await generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' || false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            },
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

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
                userEmail: user.email
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
    handleUserRegistration,
    handleUserLogin,
    handleProfile
}