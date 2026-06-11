const jwt = require('jsonwebtoken');
const secret = 'Skhendra@#$%123456787';

async function setUser(user) {
    return jwt.sign(user, secret);
}

async function getUser(id) {

}

module.exports = {
    setUser,
    getUser
}