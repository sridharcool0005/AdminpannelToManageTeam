var mysql = require('mysql');
const bulkcontactsModel = require('../models/bulkprofilecreateModel');
const crypto = require("crypto");
const db = require('../services/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const request = require('request');
var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smsportal',
  debug: false,

});

// module.exports.createbulkprofiles = async (req, res) => {

//   const password = '121212'
//   const hash = bcrypt.hashSync(password, saltRounds);

//   const { formdata } = req.body;

//   var count = '';
//   var promiseSaveArr = [];
//   if (Array.isArray(formdata)) {
//     formdata.forEach(obj => {
//       count = formdata.length

//       const smsportal_authkey = crypto.randomBytes(16).toString("hex");
//       const agent_id = crypto.randomBytes(4).toString("hex");
//       // create excel model
//       db.sync().then(function () {
//         var newTemplate = {
//           agent_id: agent_id,
//           smsportal_authkey: smsportal_authkey,
//           firstname: obj.firstname,
//           lastname: obj.lastname,
//           email: obj.email,
//           mobilenumber: obj.mobilenumber,
//           country_code: '91',
//           profession: obj.profession,
//           pin: hash,
//         };
//         // save one obj

//         promiseSaveArr.push(bulkcontactsModel.create(newTemplate))

//       });
//     });
//   }

//   return await Promise.all(promiseSaveArr).then(result => {

//     res.status(200).send({ success: true, message: count + ' ' + 'profiles created  sucessfully' });
//   }).catch((err) => {

//     res.status(400).send({ success: false, message: err.message })
//   });

// };


module.exports.createbulkprofiles = async (req, res) => {
const partner_id=req.params.partner_id;
  const api = 'https://www.portalapi.nutansms.in/addNewClient.php?sales_channel=smsportal';

  const { formdata } = req.body;

  var count = '';
  var promiseSaveArr = [];
  if (Array.isArray(formdata)) {
    formdata.forEach(obj => {
      count = formdata.length
      const smsportal_authkey = crypto.randomBytes(16).toString("hex");
      const agent_id = crypto.randomBytes(4).toString("hex");

      const options = {
        url: api,
        body: {
          client_id: agent_id,
          client_authkey: smsportal_authkey,
          client_firstname: obj.firstname,
          client_lastname: obj.lastname,
          client_mobile_number: obj.mobilenumber,
          client_role: obj.profession,
          partner_id: partner_id
        },
        headers: {
          'Authorization': 'bh#xg6sf(gs67nsbsf99gsf%nn'
        },
        json: true,
        method: 'POST',
      }

      promiseSaveArr.push(options)
      request(options, (err, response, body) => {
        if (err) {
          res.json(err)
        } else {
          console.log(body)
        }
      });

    });

  }

  return await Promise.all(promiseSaveArr).then(result => {
    //  console.log(result,'result')
    res.status(200).send({ success: true, message: count + ' ' + 'profiles created  sucessfully' });
  }).catch((err) => {

    res.status(400).send({ success: false, message: err.message })
  });

}


module.exports.getContacts = async function (req, res) {

  query = "SELECT * FROM app_pctable_tests "
  await database.query(query, function (err, result, fields) {
    if (err) throw err;
    if (!result.length) {
      res.status(200).send({ status: 'false', message: 'No Contacts Imported' });
    } else {
      res.status(200).send({ status: 'success', data: result })
    }
  });
}

module.exports.deletecontact = (req, res) => {
  const pcid = req.body.pcid;
  database.query('DELETE FROM `app_pctable_tests` WHERE `pcid`=?',
    [pcid], function (error, results, fields) {
      if (error) throw error;
      res.send({
        code: 200,
        status: 'success',
        message: "contact Deleted Sucessfully",
      });
    });
};
