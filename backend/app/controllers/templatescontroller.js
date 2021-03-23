var mysql = require('mysql');
const templateModel = require('../models/templatesModel');
const crypto = require("crypto");
const db = require('../services/database');

var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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


    module.exports.uploadtemplates = async (req, res) => {
       
        const { data } = req.body;
     
        var promiseSaveArr = [];
        if (Array.isArray(data)) {
          data.forEach(obj => {
            // create excel model
            db.sync().then(function () {
                var newTemplate = {
                    event_code: obj.event_code,
                    message: obj.message,
                    tid :obj.tid 
                };
            // save one obj
            promiseSaveArr.push(templateModel.create(newTemplate))
          });
        });
        }

        return await Promise.all(promiseSaveArr).then(result => {
          res.status(200).send({ success: true, message: 'Data imported  sucessfully' });
        }).catch((err) => {
          console.log('err in templateservice ', err);
          res.status(400).send({ success: false, message: err.message })
        });
      
      };
      

      module.exports.deletetemplate = (req, res) => {
        const tid=req.body.tid;
        database.query('DELETE FROM `system_templates` WHERE `tid`=?', 
            [tid], function (error, results, fields) {
                if (error) throw error;
                res.send({
                    code: 200,
                    status:'success',
                    message: "template deleted Sucessfully",
                });
        });
    };
    