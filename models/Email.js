const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import Sequelize instance

const EmailLog = sequelize.define("EmailLog", {
    recipient: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sent_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = EmailLog;
