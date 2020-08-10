// The User model.
'use strict'; 

var Sequelize = require('sequelize'),
    db = require('../services/database');
 

// 1: The model schema.
var modelDefinition = {
    tid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    message: {
        type: Sequelize.STRING,
        allowNull: true
    },
  
    event_code: {
        type: Sequelize.STRING,
        allowNull: true
    },
};


// 3: Define the User model.
var packageModel = db.define('system_templates', modelDefinition);

module.exports = packageModel;