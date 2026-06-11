const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    console.log(password);
    return await bcrypt.hash(password, 10);
}

const verifyPassword = async (plainPassword, hashPassword) => {
    console.log(plainPassword, hashPassword);
    return await bcrypt.compare(plainPassword, hashPassword);
}

module.exports = {
    hashPassword,
    verifyPassword
}