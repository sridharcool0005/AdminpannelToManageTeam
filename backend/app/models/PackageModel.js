// The User model.
'use strict'; 

var Sequelize = require('sequelize'),
    db = require('../services/database');
 

// 1: The model schema.
var modelDefinition = {
    package_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    package_icon: {
        type: Sequelize.STRING,
        allowNull: true
    },
    package_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    package_route: {
        type: Sequelize.STRING,
        allowNull: false
    },
    package_unit_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    package_sms_credits: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    package_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    package_validity_in_months: {
        type: Sequelize.STRING,
        allowNull: false
    },
    package_details: {
        type: Sequelize.STRING,
        allowNull: false
    },
    package_status: {
        type: Sequelize.STRING,
        allowNull: false
    }
};


// 3: Define the User model.
var packageModel = db.define('smspackage_master', modelDefinition);

module.exports = packageModel;