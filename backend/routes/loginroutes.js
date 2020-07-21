var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const crypto = require("crypto");
var jwt = require('jsonwebtoken');


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smsportal',

});
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  // var sql = "CREATE TABLE users (email VARCHAR(255), password VARCHAR(255))";
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  console.log('connected as id ' + connection.threadId);
});
exports.register = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)
  const id = crypto.randomBytes(4).toString("hex");
  var users = {
    "email_id": req.body.email_id,
    "password": encryptedPassword,
    "mobile_number": req.body.mobile_number,
    "role": req.body.role,
    "user_id": id
  }
  console.log(users)
  connection.query('INSERT INTO portalusers SET ?', users, function (error, results, fields) {

    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      res.send({
        "code": 200,
        "success": "user registered sucessfully"
      });
    }
  });
}

exports.login = async function(req,res){
  var email_id= req.body.email_id;
  var password = req.body.password;
  console.log(email_id, password)
  var sql = 'SELECT * FROM portalusers WHERE email_id = ?';
  connection.query(sql,[email_id], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].password)
        if(comparision){
          res.send({
            "code":200,
            "success":"login sucessfull"
          })
        }
        else{
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
            });
      }
    }
    });
}






// exports.login = async function (req, res) {

//   var appData = {};
//   var email_id = req.body.email_id;
//   var password = req.body.password;

//  connection.query('SELECT * FROM users WHERE email_id = ?', [email_id],async function (err, rows, fields) {
//     if (err) {
//       res.send({
//         "code": 400,
//         "failed": "error ocurred"
//       })
//     } else {
//       if (rows.length > 0) {
//         const comparision = await bcrypt.compare(password, results[0].password)
//         if (comparision) {
//           let token = jwt.sign(rows[0], process.env.SECRET_KEY, {
//             expiresIn: 1440
//           });
//           appData.error = 0;
//           appData["token"] = token;
//           res.status(200).json(appData);
//         } else {
//           appData.error = 1;
//           appData["data"] = "Email and Password does not match";
//           res.status(204).json(appData);
//         }
//       } else {
//         appData.error = 1;
//         appData["data"] = "Email does not exists!";
//         res.status(204).json(appData);
//       }
//     }
//   });

// }


