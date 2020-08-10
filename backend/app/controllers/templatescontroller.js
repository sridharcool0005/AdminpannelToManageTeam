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


 module.exports.geteventCodes = async function (req, res) {
    query = "SELECT event_code  FROM system_template_types"
        await database.query(query, function (err, result, fields) {
            if (err) throw err;
            res.send({
                "code": 200,
                "success": "users data ",
                "data": result
            });
        });
    }
    
    module.exports.getAllTemplateTypes = async function (req, res) {
        query = "SELECT * FROM system_template_types"
        await database.query(query, function (err, result, fields) {
            if (err) throw err;
            res.send({
                "code": 200,
                "success": "users data ",
                "data": result
            });
        });
    }

    module.exports.addnewTemplate= async function (req, res) {
        const tid  = crypto.randomBytes(3).toString("hex");
        const {event_code,message} = req.body

        db.sync().then(function () {
            var newTemplate = {
                event_code: event_code,
                message: message,
                tid :tid 
            };
            return templateModel.create(newTemplate).then(function () {
                res.status(201).json({status:'success', message: 'newTemplate created!' });
            });
        }).catch(function (error) {
            console.log(error);
            res.status(403).json({ message: 'data already exists!' });
        });
    }


    module.exports.getsmsTemplates = async function (req, res) {
        const event_code =req.body.event_code ;
        console.log(event_code)
        
        query = "SELECT * FROM system_templates WHERE event_code =?"
        await database.query(query,[event_code ] ,function (err, result, fields) {
            if (err) throw err;
            res.send({
                "code": 200,
                "success": "users data ",
                "data": result
            });
        });
    }