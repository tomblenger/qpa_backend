const express = require("express");
const { sendEmail } = require("../services/emailService");

const router = express.Router();

router.post("/send", async (req, res) => {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const response = await sendEmail(to, subject, text, html);

    if (response.success) {
        res.json({ success: true, message: "Email sent successfully" });
    } else {
        res.status(500).json({ success: false, error: response.error });
    }
});

module.exports = router;
