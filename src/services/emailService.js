const nodemailer = require("nodemailer");
const { EmailLog } = require("../../models/Email"); // Import Sequelize Model
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Set to true if using port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function sendEmail(to, subject, text, html) {
    try {
        const info = await transporter.sendMail({
            from: `"Your App Name" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        });

        // Store email log in PostgreSQL using Sequelize
        await EmailLog.create({
            recipient: to,
            subject: subject,
            message: text || html,
        });

        console.log("Email sent: ", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email: ", error);
        return { success: false, error };
    }
}

module.exports = { sendEmail };