
var http = require("https");
var mysql = require('mysql');

const crypto = require("crypto");
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smsportal',
  debug: false,

});

module.exports.sendBulkSMS = async (req, response) => {
const partner_id=req.params.partner_id;
const { mobilenumbers, message } = req.body;
  var sql = "select reseller_authkey, reseller_sender_id from portal_counterV2 where partner_id =?"
  db.query(sql, [partner_id], function (error, results, fields) {
    console.log(results)
    const reseller_authkey=results[0].reseller_authkey;
    const reseller_sender_id=results[0].reseller_sender_id;
      if (error) throw error;
     

  const mobile=mobilenumbers;
  console.log(mobile)

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
      [{ message: message, to:mobile }

      ]
  }));
  req.end();
});
}



module.exports.sendSMS = async (req, response) => {

  const partner_id=req.params.partner_id;
  const { mobilenumbers, message } = req.body;
  var sql = "select reseller_authkey, reseller_sender_id from portal_counterV2 where partner_id =?"
  db.query(sql, [partner_id], function (error, results, fields) {
    console.log(results)
    const reseller_authkey=results[0].reseller_authkey;
    const reseller_sender_id=results[0].reseller_sender_id;
      if (error) throw error;

  const mobile=mobilenumbers;
  console.log(mobile)

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
      [{ message: message, to:[mobile] }

      ]
  }));
  req.end();
});
}




module.exports.insertnotifications = (req, res) => {
  
  const partner_id=req.params.partner_id;
  const {client_ids,message,premiumplan_ratecard,smspackage_ratecard}= req.body;
  console.log(premiumplan_ratecard,smspackage_ratecard)

  if(!client_ids){
      res.status(200).send({status:false, message:'error in adding push notifications'})
  }
else{
  client_ids.forEach(myFunction);
  function myFunction(item) {
      const nid = crypto.randomBytes(4).toString("hex");
      var values = {
        partner_id: partner_id,
          nid: nid,
          client_id: item,
          title: 'Upgrade Premium',
          message: message,
          action: '11',
          url: 'nil',
          status: 'new'
      }

      var sql = "INSERT INTO portal_mynotifications SET ?"
  db.query(sql, [values], function (error, results, fields) {
      if (error) throw error;
     
  });
  var updateuserQuery="UPDATE portal_users SET  smspackage_ratecard =?,premiumplan_ratecard =? WHERE client_id =? and partner_id =?"
  db.query(updateuserQuery, [smspackage_ratecard,premiumplan_ratecard,item,partner_id], function (error, results, fields) {
    if (error) throw error;
   
});
  }
  res.send({
      code: 200,
      status: 'success',
      message: "push notifications added Sucessfully",
  }); 
}
  
   
};
