// The User model.
'use strict'; 

var Sequelize = require('sequelize'),
    db = require('../services/database');
 

// 1: The model schema.
var modelDefinition = {
    last_client_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    last_package_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_order_id: {
        type: Sequelize.STRING,
        allowNull: false
    },

    last_coupon_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gst_rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    temp_authkey: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reseller_sender_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reseller_authkey: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reseller_authkey_otp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reseller_template_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    startup_account_sender_id:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    startup_account_authkey:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    startup_account_template_id:{
        type: Sequelize.STRING,
        allowNull: false 
    }
};


// 3: Define the User model.
var packageModel = db.define('counter', modelDefinition);

module.exports = packageModel;