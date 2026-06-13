const User = require("../models/user.model.js");
const { verifyToken } = require("../utils/auth.js");

async function checkAuthentication(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: "Authorization header missing or malformed"
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Token not provided"
            });
        }

        const decoded = await verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }

        const user = await User.findById(decoded?.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

async function checkRestrictedAccess(roles = []) {
    return async function (req, res, next) {
        if (!req.user) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        next();
    }

}

module.exports = {
    checkAuthentication,
    checkRestrictedAccess
};