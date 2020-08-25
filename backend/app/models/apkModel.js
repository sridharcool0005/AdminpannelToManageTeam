// The User model.
'use strict'; 

var Sequelize = require('sequelize'),
    db = require('../services/database');
 

// 1: The model schema.
var modelDefinition = {
    apk_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
  
    apk_filename: {
        type: Sequelize.STRING,
        allowNull: true
    },
  
};


// 3: Define the User model.
var apkModel = db.define('nutan_apk', modelDefinition);

module.exports = apkModel;