const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Import Sequelize instance

const OTP = sequelize.define("OTP", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = OTP;
