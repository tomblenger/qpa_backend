const nodemailer = require("nodemailer");
const { Settings } = require("../../models/Settings"); // Import Sequelize Model
require("dotenv").config();
class SettingsService {
    async getSettings (){
        try {
            return await Settings.findOne({
                where: {id: 1}
            });
        } catch (error) {
            throw new Error('Error fetching settings: ' + error.message);
        }
    }
}


module.exports = {SettingsService};