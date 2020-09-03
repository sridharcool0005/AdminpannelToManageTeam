var mysql = require('mysql');
var constants = require('../constants/constant');
var emailservice = require('../routes/mailer');
var http = require('http');
const crypto = require("crypto");
const request = require('request');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smsportal',
  debug: false,

});

module.exports.getclients = async function (req, res) {
  query = "select a.client_id,b.client_firstname, b.client_lastname,a.user_mobile_number,a.account_status,a.user_regn_channel  from portal_users a, clients_master b  where (a.client_id = b.client_id)order by a.created_on desc"
  await db.query(query, function (err, result, fields) {
    if (err) throw err;

    res.send({
      "code": 200,
      "success": "clients data ",
      "data": result
    });
  });

}


module.exports.getclientsbyfilter = async function (req, res) {
  const account_status = req.body.account_status;
  query = "select a.client_id,b.client_firstname, b.client_lastname,a.user_mobile_number,a.account_status,a.user_regn_channel from portal_users a, clients_master b where (a.account_status = ? and a.client_id=b.client_id)"
  await db.query(query, [account_status], function (err, result, fields) {
    if (err) throw err;
    if (!result.length) {
      res.status(201).send({ status: 'false', message: 'No data found' });
    }
    else {
      res.send({
        "code": 200,
        "success": "clients data ",
        "data": result
      });
    }

  });

}



module.exports.getclientsDetailed = async function (req, res) {
  query = "SELECT * FROM clients_master"
  await db.query(query, function (err, result, fields) {
    if (err) throw err;


    res.send({
      "code": 200,
      "success": "clients data ",
      "data": result
    });
  });

}

module.exports.getuserdata = async function (req, res) {
  query = "SELECT * FROM users"
  await db.query(query, function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      "success": "users data ",
      "data": result
    });
  });
}

// module.exports.getuserDetails = async function (req, res) {
//     const client_id=req.body.client_id;
//     query = "SELECT * FROM users WHERE client_id=?"
//     await db.query(query,[client_id] ,function (err, result, fields) {
//         if (err) throw err;
//         res.send({
//             "code": 200,
//             "success": "users data ",
//             "data": result
//         });
//     });
// }

module.exports.updateclientData = async function (req, res) {

  const { client_id, user_smsgateway_authkey,user_smsgateway_route, user_smsgateway_sender_id, user_smsgateway_unicode, account_type, account_status, user_smsgateway_pid } = req.body
  var sql = "UPDATE users SET  user_smsgateway_authkey =?,user_smsgateway_route =?,user_smsgateway_sender_id =?,user_smsgateway_unicode =?,account_type =?,account_status =?,user_smsgateway_pid =? WHERE  client_id =?";
  await db.query(sql, [user_smsgateway_authkey,user_smsgateway_route, user_smsgateway_sender_id, user_smsgateway_unicode, account_type, account_status, user_smsgateway_pid, client_id], function (err, result, fields) {

    if (err) throw err;
    res.send({
      "code": 200,
      "message": "Data updated Sucessfully",
    });
  });
}


module.exports.deleteclient = (req, res) => {
  const client_id = req.body.client_id;
  db.query('DELETE FROM `users` WHERE `client_id`=?',
    [client_id], function (error, results, fields) {
      if (error) throw error;
      res.send({
        "code": 200,
        "success": "Data updated Sucessfully",
      });
    });
};

module.exports.getuserDetails = async function (req, res) {
  const client_id = req.body.client_id;
  query = "select a.client_id,a.user_smsgateway_pid,a.user_smsgateway_sender_id,a.user_smsgateway_regn_status,a.user_smsgateway_authkey,a.user_smsgateway_route,a.user_smsgateway_unicode,a.user_cross_regn_status, a.user_mobile_number, a.user_email, a.user_regn_channel, a.account_type, a.account_status, b.client_firstname, b.client_lastname, b.client_whatsapp_number, b.client_telegram_number, b.client_company_name, b.client_address1, b.client_address2, b.client_city, b.client_district, b.client_postoffice, b.client_pincode, b.client_state, b.client_industry,b.client_gst_number, b.client_expiry from users a, clients_master b where a.client_id =? and b.client_id =? "
  await db.query(query, [client_id, client_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      "success": "users data ",
      "data": result
    });
  });
}

module.exports.sendSMS = async (req, response) => {

  const { mobile, message } = req.body;

  var options = {
    "method": "POST",
    "hostname": "api.msg91.com",
    "port": null,
    "path": "/api/v2/sendsms",
    "headers": {
      "authkey": '316115AorUQYTq5e351ea1P1',
      "content-type": "application/json"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      const result = body.toString()
      response.status(200).send(result)
    })
  });

  req.write(JSON.stringify({
    sender: 'NUTANS',
    route: '4',
    country: '+91',
    sms:
      [{ message: message, to: [mobile] }

      ]
  }));
  req.end();
}

module.exports.activationEmail = async (req, res) => {
  const email = req.body.email;
  const toEmail = [email];
  emailservice.ActivationEmail(toEmail, constants.activationEmail).then(sendemail => {
    res.status(200).send({ status: 'success', message: 'email sent successfully' })
  }).catch(err => {
    res.status(400).send(err.message)
  })

}



module.exports.addnewClient = async (req, res) => {

  const api = 'https://www.nutansms.nutantek.com/clients/addNewClient.php?sales_channel=smsportal';
  let client_id = crypto.randomBytes(6).toString("hex");
  let authkey = crypto.randomBytes(8).toString("hex");
  console.log(client_id, authkey)
  const options = {
    url: api,
    body: {
      client_id: client_id,
      client_authkey: authkey,
      client_firstname: req.body.client_firstname,
      client_lastname: req.body.client_lastname,
      client_mobile_number: req.body.client_mobile_number,
      client_whatsapp_number: req.body.client_whatsapp_number,
      client_email: req.body.client_email,
      client_address1: req.body.client_address1,
      client_address2: req.body.client_address2,
      client_city: req.body.client_city,
      client_pincode: req.body.client_pincode,
      client_postoffice: req.body.client_postoffice,
      client_district: req.body.client_district,
      client_state: req.body.client_state,
      client_company_name: " ",
      client_country: "",
      client_industry: " ",
      // default set to 91.... to update if support opens for other countries
      client_country_code: " 91",
      client_website: " ",
      client_facebook: " ",
      client_linkedin: " ",
      client_gst_number: " ",
      client_smsgateway: "pending"
    },
    headers: {
      'Authorization': 'bh#xg6sf(gs67nsbsf99gsf%nn'
    },
    json: true,
    method: 'POST',
  }
  request(options, (err, response, body) => {
    if (err) {
      res.json(err)
    } else {
      res.json(body)

    }
  });


}



module.exports.updateclientStatus = async function (req, res) {

  const { client_id, account_status, user_regn_channel } = req.body

  const today_date = new Date()

  const curDate = new Date();

  console.log(curDate, 'curdate')

  const campaign_status = "SELECT * FROM portal_live_campaign WHERE status='active' and (valid_from_date <= ? and valid_to_date >= ?)"

  await db.query(campaign_status, [today_date, today_date], function (err, result, fields) {
    if (err) throw err;

    if (!result.length) {
      res.status(201).send({ status: 'false', message: 'No data found' });
    } else {
      console.log(result)
      const duration = result[0].duration_in_days
      var expiry_date = new Date();
      expiry_date.setDate(expiry_date.getDate() + duration);
      const campaign_code = result[0].campaign_code
      const act_date = today_date;
      const exp_date = expiry_date

      const verifyCredits = "SELECT package_id,package_sms_credits from portal_smspackage_master where package_id LIKE" + db.escape('%' + campaign_code + '%')
      db.query(verifyCredits, function (err, result, fields) {

        if (!result.length) {

          var sql = "UPDATE portal_users SET  account_status =?,account_plan_id =?,plan_activation_date =?,plan_expiry_date =? WHERE client_id =?";

          db.query(sql, [account_status, campaign_code, act_date, exp_date, client_id], function (err, result, fields) {

            res.status(201).send({ status: 'true', message: 'Data is updated' });


          })

        } else {

          const sql = "SELECT package_id, package_sms_credits  from portal_smspackage_master where package_status = 'active' and package_id LIKE " + db.escape('%' + campaign_code + '%');


          db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result, 'verify packid')
          })

          const updateifsmspackexits = "UPDATE portal_users SET  account_status =?, account_plan_id =?, plan_activation_date =?, plan_expiry_date =?, smspackage_act_date =?, smspackage_exp_date =?  WHERE client_id =?";
          const smspackage_act_date = act_date;
          const smspackage_exp_date = exp_date;

          db.query(updateifsmspackexits, [account_status, campaign_code, act_date, exp_date, smspackage_act_date, smspackage_exp_date, client_id], function (err, result, fields) {
            if (err) throw err;

            console.log(result, 'updateifsmspackexits')
          })

          const postvalues = {
            client_id: client_id,
            package_id: result[0].package_id,
            order_id: 'SIGNUP',
            package_price: 0,
            coupon_id: 0,
            coupon_amount: 0,
            gst_amount: 0,
            total_amount_paid: 0,
            payment_mode: 'SIGNUP',
            payment_gateway_txn_id: 'NIL',
            payment_gateway_txn_ref: 'NIL',
            payment_status_code: 'success',
            payment_sync_status: 1,
            notes: 'Signup credits',
            sales_channel: user_regn_channel,
            txn_date: act_date
          }

          const insertintoPaymentHistory = "INSERT INTO portal_clients_payments_history SET ?";
          db.query(insertintoPaymentHistory, postvalues, function (err, result, fields) {
            if (err) throw err;
            console.log(result, 'insertintoPaymentHistory')

          })


          const credits_history_values = {
            client_id: client_id,
            package_id: result[0].package_id,
            order_id: 'SIGNUP',
            package_activation_date: act_date,
            package_expiry_date: smspackage_exp_date,
            sms_credits_quantity: result[0].package_sms_credits,
            sms_package_status: 'active'
          }


          const insertintoSms_credits_history = "INSERT INTO portal_clients_sms_credits_history SET ?";
          db.query(insertintoSms_credits_history, credits_history_values, function (err, result, fields) {
            if (err) throw err;
            console.log(result, 'insertintoSms_credits_history')
            res.status(201).send({ status: 'true', message: 'Data is updated sucessfully' });
          })
        }
      })

    }

  })


}