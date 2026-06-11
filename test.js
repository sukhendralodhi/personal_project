const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
});

transporter.sendMail({
    from: process.env.EMAIL,
    to: "mpct5jan1998@gmail.com",
    subject: "Test Email",
    text: "Hello from Node.js"
})
    .then(() => console.log("Email sent"))
    .catch(console.error);