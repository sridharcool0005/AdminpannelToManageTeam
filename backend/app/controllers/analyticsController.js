var mysql = require('mysql');


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'smsportal',
    debug: false,

});

module.exports.getpurchaseData = async function (req, res) {
    query = "select a.client_id, a.client_firstname, a.client_lastname, b.txn_date, b.order_id, b.package_id, c.package_sms_credits ,b.total_amount_paid, b.payment_status_code from clients_master a, clients_payments_history b, smspackage_master c where (a.client_id=b.client_id and b.package_id = c.package_id)"
    await db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}

module.exports.getpurchaseDataByDate = async function (req, res) {
    const {fromDate,toDate} = req.body;
    query = "select a.client_id, a.client_firstname, a.client_lastname, b.txn_date, b.order_id, b.package_id, b.total_amount_paid, b.payment_status_code from clients_master a, clients_payments_history b where (a.client_id=b.client_id and ( b.txn_date BETWEEN ? AND ? + interval 1 day)) "
    await db.query(query,[fromDate,toDate],function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}
 

module.exports.getpurchaseDetailed = async function (req, res) {
    const {order_id,package_id}=req.body
    console.log(order_id,package_id)
 query = "select a.client_id, a.client_firstname, a.client_lastname, a.client_email, a.client_mobile_number, a.client_city, a.client_state, b.coupon_id, b.coupon_amount, b.txn_date,b.order_id, c.package_name, c.package_sms_credits, b.payment_mode, b.payment_status_code, b.payment_gateway_txn_id, b.payment_gateway_txn_ref from clients_master a, clients_payments_history b, smspackage_master c where (a.client_id = b.client_id and b.order_id =? and c.package_id =? )"
    await db.query(query,[order_id,package_id], function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}

module.exports.getSalesData = async function (req, res) {
    const {fromDate,toDate} = req.body;
    
    query = "select a.txn_date,a.payment_status_code, a.package_id, b.package_name, a.total_amount_paid, a.payment_mode from clients_payments_history a, smspackage_master b where (a.package_id = b.package_id and ( a.txn_date BETWEEN ? AND ?  + interval 1 day)) "
    await db.query(query,[fromDate,toDate], function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}




module.exports.updatePaymentStatus = async function (req, res) {
    const {payment_status,client_id,order_id,add_balance} = req.body;
    console.log(payment_status,order_id,client_id,add_balance)
    query = "update  clients_payments_history a, clients_sms_credits_history b, smspackage_master c set a.payment_status_code =?, b.sms_credits_quantity = c.package_sms_credits, b.add_balance =? where ((a.client_id =? and a.order_id =?) and (a.client_id=b.client_id and a.order_id = b.order_id) and b.package_id=c.package_id)"
    await db.query(query,[payment_status,add_balance,client_id,order_id], function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}
