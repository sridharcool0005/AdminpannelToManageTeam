
var http = require("https");
var mysql = require('mysql');

const crypto = require("crypto");
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smsportal',
  debug: false,

});

module.exports.sendSMS = async (req, response) => {


  const { mobilenumbers, message } = req.body;
  const mobile=mobilenumbers.toString();
  console.log(mobile)

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


module.exports.insertnotifications = (req, res) => {
  
  const partner_id=req.params.partner_id;
  const {client_ids,message,ratecard_id}= req.body;

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
  var updateuserQuery="UPDATE portal_users SET ratecard_id =? WHERE client_id =? and partner_id =?"
  db.query(updateuserQuery, [ratecard_id,item,partner_id], function (error, results, fields) {
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
