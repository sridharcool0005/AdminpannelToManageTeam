var mysql = require('mysql');
const request = require('request');
var http = require("https");
const orderIdApi = 'https://www.portalapi.nutansms.in/getOrderID.php';

var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smsportal',
  debug: false,

});


module.exports.getsmspackagelist = async function (req, res) {

  query = "SELECT * FROM portal_smspackage_master "
  await database.query(query, function (err, result, fields) {
    if (err) throw err;
    if (!result.length) {
      res.status(200).send({ status: 'false', message: 'No data found' });
    } else {
      res.status(200).send({ status: 'success', data: result })
    }
  });
}


module.exports.getpremiumplanlist = async function (req, res) {

  query = "SELECT * FROM `portal_premiumplans_master` WHERE package_id like 'P1%'"
  await database.query(query, function (err, result, fields) {
    if (err) throw err;
    if (!result.length) {
      res.status(200).send({ status: 'false', message: 'No data found' });
    } else {
      res.status(200).send({ status: 'success', data: result })
    }
  });
}

// module.exports.updatepaymentdetails = async function (req, res) {
//   query = "SELECT 	last_order_id FROM counter"
//   await database.query(query, function (err, result, fields) {
//     if (err) throw err;
//     var temp_order_id = result[0].last_order_id;
//     temp_order_id++
//     console.log(temp_order_id);
//   }).then(response => {
// const order_id="smsportal/"+temp_order_id
// const {payment_gateway_txn_id,payment_gateway_txn_ref,txn_date}= req.body
//     const values={last_order_id: order_id,payment_mode:payment_mode,payment_gateway_txn_id:payment_gateway_txn_id,payment_gateway_txn_ref:payment_gateway_txn_ref,txn_date:txn_date}
//     const insertquery1 = "insert into portal_smscredits_history SET =? "
//     database.query(insertquery1, values, function (err, result, fields) {
//       if (err) throw err;

//     })

//   }).then(res => {
//     const {payment_gateway_txn_id,payment_gateway_txn_ref,txn_date}= req.body
//     const values={last_order_id: order_id,payment_mode:payment_mode,payment_gateway_txn_id:payment_gateway_txn_id,payment_gateway_txn_ref:payment_gateway_txn_ref,txn_date:txn_date}
//     const insertquery2 = "insert into portal_clients_payments_history SET =? "
//     database.query(insertquery2, credits_history_values, function (err, result, fields) {
//       if (err) throw err;

//     })
//   }).then(res => {
//     const query = "UPDATE counter SET =?"
//     const values={last_order_id:temp_order_id}
//     database.query(query, values, function (err, result, fields) {
//       res.status(201).send({ status: 'true', message: 'Data is updated sucessfully' });
//     })
//   }).catch(err =>{
//     res.status(500).send({ status: 'false', message: 'error'})
//   })

// }


module.exports.getclientdetails= async function (req, res) {
const {mobilenumber}=req.body;
const query="select a.client_id,a.user_regn_channel,a.user_authkey_old,b.client_firstname, b.client_lastname from portal_users a,clients_master b where a.user_mobile_number =? and b.client_mobile_number =?"
await database.query(query, [mobilenumber,mobilenumber], function (err, result, fields) {
  if (err) throw err;

  if (!result.length) {
    res.status(201).send({ status: 'false', message: 'No data found' });
  }else{
    res.send({
      "code": 200,
      status: 'success',
      "data": result
    });
  }
 
});

}


module.exports.getOrderId = async (req, res) => {
 
    const { package_id,coupon_id,sales_channel,client_id,authkey} = req.body;
    console.log(package_id)
    const options = {
      url: orderIdApi,
      qs: { client_id: client_id, sales_channel:sales_channel },
      headers: {
        'Authorization': authkey
      },
      body: {
        package_id: package_id,
        coupon_id: coupon_id,

      },
      json: true,
      method: 'Post',
    }
    console.log(options)
    request(options, (err, response, body) => {
      // console.log(err)
      // console.log(response)
      console.log(body)

      if (err) {
        res.json(err)
      } else {
        res.json(body)

      }
    });
  
}

