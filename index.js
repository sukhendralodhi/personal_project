const express = require('express');
const connectDatabase = require('./db/db.connection.js');
const userRouter = require('./routes/user.router.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 8001;

const app = express();


// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// port 
// db url 
const DATABASE_URL = process.env.DATABASE_URL

// db function call 
connectDatabase(DATABASE_URL).then(() => {
    console.log("Database connected");

}).catch((error) => { console.log(error) });

app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});