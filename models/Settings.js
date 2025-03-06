const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import Sequelize instance

const Settings = sequelize.define("Settings", {
    auth2FA: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Settings;