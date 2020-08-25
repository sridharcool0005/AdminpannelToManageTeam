// The User model.
'use strict'; 

var Sequelize = require('sequelize'),
    db = require('../services/database');
 

// 1: The model schema.
var modelDefinition = {
    agent_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    smsportal_authkey: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    country_code: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mobilenumber: {
        type: Sequelize.STRING,
        allowNull: false,
        maxLength: 10,
        unique: true
    },
    profession: {
        type: Sequelize.STRING,
        allowNull: true
    },
    pin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
  
};


// 3: Define the User model.
var profilecreateModel = db.define('testapp_clients_master', modelDefinition);

module.exports = profilecreateModel;