const express = require("express");
const { sendOTP, verifyOTP } = require("../services/otpService");

const router = express.Router();

router.post("/send", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    const response = await sendOTP(email);
    res.json(response);
});

router.post("/verify", async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const response = await verifyOTP(email, otp);
    res.json(response);
});
module.exports = router;

// fetch("http://localhost:4000/otp/send", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email: "user@example.com" }),
// })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));