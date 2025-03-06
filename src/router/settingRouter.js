const {SettingsService} = require("../services/settingsService");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await SettingsService.getSettings();
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({message: "error"})
    }
});


module.exports = router;