const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (user) => {
    return await jwt.sign({
        id: user._id,
        role: user.role,
        email: user.email
    },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
}

const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}