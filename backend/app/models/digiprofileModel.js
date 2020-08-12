// The User model.
'use strict'; 

var Sequelize = require('sequelize'),
    db = require('../services/database');
 

// 1: The model schema.
var modelDefinition = {
    image_id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    image_title: {
        type: Sequelize.STRING,
        allowNull: true
    },
  
    image_filename: {
        type: Sequelize.STRING,
        allowNull: true
    },
    image_category: {
        type: Sequelize.STRING,
        allowNull: true
    },
};


// 3: Define the User model.
var digitalprofileModel = db.define('dc_sample_images', modelDefinition);

module.exports = digitalprofileModel;