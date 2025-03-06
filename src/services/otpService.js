const nodemailer = require("nodemailer");
const { OTP } = require("../../models/Otp"); // Import Sequelize Model
const {User} = require("../../models/User");
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


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Ensures it's always 6 digits
}

async function sendOTP(email) {
    try {
        const otpCode = generateOTP();
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + 10); // OTP valid for 10 minutes

        // Store OTP in the database
        await OTP.create({
            email,
            code: otpCode,
            expiresAt: expiryTime,
        });

        // Send email
        const info = await transporter.sendMail({
            from: `"Your App" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otpCode}. It will expire in 10 minutes.`,
            html: `<p>Your OTP code is <b>${otpCode}</b>. It will expire in 10 minutes.</p>`,
        });

        console.log("OTP sent: ", info.messageId);
        return { success: true, message: "OTP sent successfully" };
    } catch (error) {
        console.error("Error sending OTP: ", error);
        return { success: false, error };
    }
}

async function verifyOTP(email, enteredOTP) {
    try {
        const otpRecord = await OTP.findOne({ where: { email, code: enteredOTP } });

        if (!otpRecord) {
            return { success: false, message: "Invalid OTP" };
        }

        // Check if OTP is expired
        const now = new Date();
        if (otpRecord.expiresAt < now) {
            await OTP.destroy({ where: { email } }); // Remove expired OTP
            return { success: false, message: "OTP has expired" };
        }

        // OTP is valid - delete from database to prevent reuse
        await OTP.destroy({ where: { email } });

        const user = await User.findUserByEmail(otpRecord.email);

        user.update({ verified: true });

        return { success: true, message: "OTP verified successfully" };
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { success: false, error };
    }
}

module.exports = {sendOTP, verifyOTP};