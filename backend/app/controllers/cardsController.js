var mysql = require('mysql');
const templateModel = require('../models/templatesModel');
const crypto = require("crypto");
const db = require('../services/database');

var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'smsportal',
    debug: false,

});


module.exports.getAllCards = async function (req, res) {
    query = "SELECT * FROM cards"
    await database.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}