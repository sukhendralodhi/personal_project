const express = require('express');
const connectDatabase = require('./db/db.connection.js');
const authRouter = require('./routes/auth.router.js');
const blogRouter = require('./routes/blog.router.js');
const userRouter = require('./routes/user.route.js');
const adminRouter = require('./routes/admin.router.js');

const cookieParser = require('cookie-parser');
require('dotenv').config();
const { checkAuthentication, checkRestrictedAccess } = require('./middlewares/bearer.middleware.js');
const { handleGetAllUsers } = require('./controllers/admin.controller.js');

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

app.use('/api', authRouter);
app.use("/api", checkAuthentication, blogRouter);
app.use("/api", checkAuthentication, userRouter);
app.use(
    "/api/admin",
    checkAuthentication,
    checkRestrictedAccess(["admin"]),
    adminRouter
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});