var mysql = require('mysql');
var constants = require('../constants/constant');
var emailservice = require('../routes/mailer');
var http = require('http');
const crypto = require("crypto");
const request = require('request');
const bcrypt = require('bcrypt');


var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smsportal',
  debug: false,

});

module.exports.getclients = async function (req, res) {
  const partner_id=req.params.partner_id;
  console.log(partner_id,'partner_id')
  query = "select a.client_id,b.client_firstname, b.client_lastname,a.user_mobile_number,a.account_status,a.user_regn_channel  from portal_users a, portal_clients_master b  where (a.client_id = b.client_id and  a.partner_id =?)order by a.created_on desc"
  await db.query(query,[partner_id] ,function (err, result, fields) {
    if (err) throw err;

    res.send({
      "code": 200,
      "success": "clients data ",
      "data": result
    });
  });

}


module.exports.getclientsbyfilter = async function (req, res) {
  const partner_id=req.params.partner_id;
  console.log(partner_id,'partner_id')
  const account_status = req.body.account_status;
  query = "select a.client_id,b.client_firstname, b.client_lastname,a.user_mobile_number,a.account_status,a.user_regn_channel from portal_users a, portal_portal_clients_master b where (a.account_status = ? and a.partner_id =? and a.client_id=b.client_id )"
  await db.query(query, [account_status,partner_id], function (err, result, fields) {
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
  const partner_id=req.params.partner_id;
  console.log(partner_id,'partner_id')
  query = "SELECT * FROM portal_portal_clients_master WHERE partner_id =?"
  await db.query(query,[partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      "success": "clients data ",
      "data": result
    });
  });

}

module.exports.getuserdata = async function (req, res) {
  const partner_id=req.params.partner_id;
  query = "SELECT * FROM portal_users WHERE partner_id =?"
  await db.query(query,[partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      "success": "users data ",
      "data": result
    });
  });
}




module.exports.getResellerCount = async function (req, res) {
  const partner_id=req.params.partner_id;
  // query = "SELECT * FROM portal_users WHERE partner_id =?"
  countQuery = "SELECT COUNT(role ='partner') AS NumberOfResellers FROM portalusers WHERE partner_id =?"
  await db.query(countQuery,[partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      "success": "users data ",
      "data": result
    });
  });
}


module.exports.updateclientData = async function (req, res) {
  const partner_id=req.params.partner_id;

  const { client_id, plan_expiry_date, user_smsgateway_id, is_sim_allowed, is_min_bal_req, user_smsgateway_authkey, user_smsgateway_sender_id1, user_smsgateway_sender_id2, user_smsgateway_route, user_smsgateway_sender_id, user_smsgateway_unicode, account_status, user_smsgateway_pid } = req.body
  var sql = "UPDATE portal_users SET ? where client_id =? and partner_id =?";

  var newTemplate = {
  
    plan_expiry_date: plan_expiry_date,
    is_sim_allowed: is_sim_allowed,
    is_min_bal_req: is_min_bal_req,
    user_smsgateway_unicode: user_smsgateway_unicode,
    user_smsgateway_authkey: user_smsgateway_authkey,
    user_smsgateway_pid: user_smsgateway_pid,
    user_smsgateway_sender_id: user_smsgateway_sender_id,
    user_smsgateway_sender_id1: user_smsgateway_sender_id1,
    user_smsgateway_sender_id2: user_smsgateway_sender_id2,
    user_smsgateway_route: user_smsgateway_route,
    account_status: account_status,
    user_smsgateway_id: user_smsgateway_id
  }
  await db.query(sql, [newTemplate, client_id,partner_id], function (err, result, fields) {

    if (err) throw err;
    res.send({
      "code": 200,
      "message": "Data updated Sucessfully",
    });
  });
}


module.exports.deleteclient = (req, res) => {
  const partner_id=req.params.partner_id;
  const client_id = req.body.client_id;
  db.query('DELETE FROM `portal_users` WHERE `client_id`=? and partner_id =?',
    [client_id,partner_id], function (error, results, fields) {
      if (error) throw error;
      res.send({
        "code": 200,
        "success": "Data updated Sucessfully",
      });
    });
};

module.exports.getuserDetails = async function (req, res) {
  const partner_id=req.params.partner_id;
  const client_id = req.body.client_id;
  query = "select a.client_id,a.plan_activation_date, a.user_smsgateway_sender_id, a.smspackage_act_date, a.smspackage_exp_date,a.user_smsgateway_pid,a.is_sim_allowed,a.is_min_bal_req,a.account_plan_id,a.plan_expiry_date,a.user_smsgateway_id,a.user_smsgateway_sender_id1,a.user_smsgateway_sender_id2,a.user_smsgateway_sender_id,a.user_smsgateway_regn_status,a.user_smsgateway_authkey,a.user_smsgateway_route,a.user_smsgateway_unicode,a.user_cross_regn_status, a.user_mobile_number, a.user_email, a.user_regn_channel, a.account_type, a.account_status, b.client_firstname, b.client_lastname, b.client_whatsapp_number, b.client_telegram_number, b.client_company_name, b.client_address1, b.client_address2, b.client_city, b.client_district, b.client_postoffice, b.client_pincode, b.client_state, b.client_industry,b.client_gst_number, b.client_expiry from portal_users a, portal_clients_master b where a.client_id =? and b.client_id =? "
  await db.query(query, [client_id, client_id,partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      "success": "users data ",
      "data": result
    });
  });
}

module.exports.sendSMS = async (req, response) => {

const partner_id=req.params.partner_id;
  const { mobile, message } = req.body;

  var sql = "select reseller_authkey, reseller_sender_id from portal_counterV2 where partner_id =?"
  db.query(sql, [partner_id], function (error, results, fields) {
    console.log(results)
    const reseller_authkey=results[0].reseller_authkey;
    const reseller_sender_id=results[0].reseller_sender_id;
      if (error) throw error;
  var options = {
    "method": "POST",
    "hostname": "api.msg91.com",
    "port": null,
    "path": "/api/v2/sendsms",
    "headers": {
      "authkey": reseller_authkey,
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
    sender: reseller_sender_id,
    route: '4',
    country: '+91',
    sms:
      [{ message: message, to: [mobile] }

      ]
  }));
  req.end();
});
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
  const partner_id=req.params.partner_id;
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
      client_smsgateway: "pending",
      client_role:req.body.profession_id,
      partner_id:partner_id
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
      const query = "select * from portal_premiumplans_master where package_id='P1005'";
      const curDate= new Date();
      db.query(query,function (err, result, fields) {
        if (err) throw err;
        const updatequery="INSERT INTO portal_users  SET ?"
        var newTemplate = {
          account_status :'active',
          account_plan_id :'',
          plan_activation_date : curDate,
          plan_expiry_date :'99 Months',
          client_id:client_id
         
        }
        db.query(updatequery,[newTemplate],function (err, result, fields) {
          if (err) throw err;
          res.status(201).send({ status: 'true', message: 'Data is updated sucessfully' });
        })
      
      })
    
    } else {
      console.log(result)
      const duration = result[0].duration_in_days
      var expiry_date = new Date();
      expiry_date.setDate(expiry_date.getDate() + duration);
      const campaign_code = result[0].campaign_code
      const act_date = today_date;
      const exp_date = expiry_date;
      const verifyCredits = "SELECT package_id,package_sms_credits from portal_smspackage_master where package_id LIKE" + db.escape('%' + campaign_code + '%')

      db.query(verifyCredits, function (err, result, fields) {

        if (!result.length) {
          var sql = "UPDATE portal_users SET  account_status =?,account_plan_id =?,plan_activation_date =?,plan_expiry_date =? WHERE client_id =?";
          db.query(sql, [account_status, campaign_code, act_date, exp_date, client_id], function (err, result, fields) {
            res.status(201).send({ status: 'true', message: 'Data is updated' });
          })

        } else {
          const sql = "SELECT package_id, package_sms_credits  from portal_smspackage_master where package_status = 'active' and package_id LIKE " + db.escape('%' + campaign_code + '%');
          const fetchdata = "select is_sim_allowed, is_min_bal_req from portal_premiumplans_master where package_id =?"
          db.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result, 'verify packid')
          })

          db.query(fetchdata, [campaign_code], function (err, result, fields) {
            if (err) throw err;
            const is_sim_allowed = result[0].is_sim_allowed;
            const is_min_bal_req = result[0].is_min_bal_req;
            console.log(is_sim_allowed, is_min_bal_req)
            const updateifsmspackexits = "UPDATE portal_users SET  account_status =?, account_plan_id =?, plan_activation_date =?, plan_expiry_date =?, smspackage_act_date =?, smspackage_exp_date =?,is_sim_allowed =?,is_min_bal_req =? WHERE client_id =?";
            const smspackage_act_date = act_date;
            const smspackage_exp_date = exp_date;
            db.query(updateifsmspackexits, [account_status, campaign_code, act_date, exp_date, smspackage_act_date, smspackage_exp_date, client_id, is_sim_allowed, is_min_bal_req], function (err, result, fields) {
              if (err) throw err;
              console.log(result, 'updateifsmspackexits')
            })

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
            package_expiry_date: exp_date,
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


module.exports.postofficeApi = async (req, res) => {
  const pinCode = req.body.pinCode;
  const options = {
    url: 'https://portalapi.nutansms.in/getPostOfficeNew.php',
    qs: { pincode: pinCode },

    method: 'GET',

    json: true,
  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    console.log(body)

    if (err) {
      res.json(err)
    } else {
      res.send(body)

    }
  });
}

module.exports.fetchProfessions = async (req, res) => {
  
  const options = {
    url: 'https://portalapi.nutansms.in/fetchProfessions.php',
    method: 'GET',

    json: true,
  }

  request(options, (err, response, body) => {
    // console.log(err)
    // console.log(response)
    console.log(body)
    if (err) {
      res.json(err)
    } else {
      res.send(body)

    }
  });
}


module.exports.getuserdataCount = async function (req, res) {
  const partner_id=req.params.partner_id;
  
  countQuery = "SELECT COUNT(client_id) AS NumberOfclients FROM users WHERE partner_id =? and  (created_on between CURRENT_date and CURRENT_DATE  + interval 1 day) order by created_on asc"
  await db.query(countQuery,[partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
     status: "success",
      result
    });
  });
}



module.exports.getuserdataCountweekly = async function (req, res) {
  const partner_id=req.params.partner_id;
 
  countQuery = "SELECT COUNT(client_id) AS NumberOfclients FROM users WHERE partner_id =? and  (created_on between CURRENT_date and CURRENT_DATE - interval 7 day) order by created_on asc"
  await db.query(countQuery,[partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      status: "success",
       result
    });
  });
}

module.exports.getplanexpirytoday= async function (req, res) {
  const partner_id=req.params.partner_id;
  
  countQuery = "SELECT COUNT(client_id) AS NumberOfclients FROM users WHERE partner_id =? and  (plan_expiry_date between CURRENT_date and CURRENT_DATE  + interval 1 day) order by created_on asc"
  await db.query(countQuery,[partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      status: "success",
       result
    });
  });
}

module.exports.getplanexpirynextweek= async function (req, res) {
  const partner_id=req.params.partner_id;
  
  countQuery = "SELECT COUNT(client_id) AS NumberOfclients FROM users WHERE partner_id =? and  (plan_expiry_date between CURRENT_date and CURRENT_DATE  + interval 7 day) order by created_on asc"
  await db.query(countQuery,[partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      status: "success",
       result
    });
  });
}

module.exports.getclientscount= async function (req, res) {
  const partner_id=req.params.partner_id;
  
  countQuery = "SELECT  COUNT(IF(account_plan_id = 'P1005', 1, NULL)) 'Freedom',  COUNT(IF(account_plan_id = 'P1008', 1, NULL)) 'Silver', COUNT(IF(account_plan_id = 'P1016', 1, NULL)) 'Gold',COUNT(IF(account_plan_id = 'P1020', 1, NULL)) 'Diamond' FROM portal_users where partner_id =?"
  await db.query(countQuery,[partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      status: "success",
     result
    });
  });
}

module.exports.ChangePassword = async (req, res) => {
  const partner_id = req.params.partner_id;
console.log(req.body.password,partner_id);
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    var sql = "UPDATE portal_adminusers SET  password =? WHERE  partner_id =?";
console.log(hash)
   db.query(sql,[hash,partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
   status: 'success',
      message:"Password changed successfully"
    });
  })

  });
}

module.exports.getusersfeedbackqueries= async function (req, res) {
  const partner_id=req.params.partner_id;
  
  Query = "SELECT  * FROM portal_users_query_feedback_test  where partner_id =? and subject <> 'APK Download'"
  await db.query(Query,[partner_id], function (err, result, fields) {
    if (err) throw err;
    res.send({
      "code": 200,
      status: "success",
     result
    });
  });
}


module.exports.getPartnerData= async function (req, res) {
  
  const role='Partner'
  Query = "SELECT  partner_id,user_name FROM portalusers   where role =?"
  await db.query(Query,[role], function (err, result, fields) {
    if (err) throw err;
    if (!result.length) {
      res.status(400).send({
        status: "error",
       message:'No data found'
      });
    }
    else{
      res.send({
        "code": 200,
        status: "success",
       result
      });
    }
  
  });
}


