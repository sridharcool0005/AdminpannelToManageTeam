// The User model.
'use strict'; 

var Sequelize = require('sequelize'),
    db = require('../services/database');
 

// 1: The model schema.
var modelDefinition = {
    event_code: {
        type: Sequelize.STRING,
        allowNull: false
    },

    display_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
  
    image_filename: {
        type: Sequelize.STRING,
        allowNull: true
    },
};


// 3: Define the User model.
var packageModel = db.define('system_template_types', modelDefinition);

module.exports = packageModel;