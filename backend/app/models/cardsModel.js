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

    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
  
    image_filename: {
        type: Sequelize.STRING,
        allowNull: true
    },
};


// 3: Define the User model.
var packageModel = db.define('cards', modelDefinition);

module.exports = packageModel;