const { verifyToken } = require('../utils/auth.js');

async function checkForAuthentication(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    try {
        const decode = await verifyToken(token);
        req.user = decode;
        next();

        // console.log("User from middleware", user)

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }

}

module.exports = {
    checkForAuthentication
}