const mongoose = require('mongoose');

async function connectDatabase(DATABASE_URL) {
    return mongoose.connect(DATABASE_URL);
}

module.exports = connectDatabase;