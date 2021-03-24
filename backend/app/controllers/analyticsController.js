var mysql = require('mysql');
const crypto = require("crypto");

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smsportal',
    debug: false,

});

module.exports.getpurchaseData = async function (req, res) {
    query = "select a.client_id, a.client_firstname, a.client_lastname, b.txn_date, b.order_id, b.package_id, c.package_sms_credits ,b.total_amount_paid, b.payment_status_code from portal_clients_master a, clients_payments_history b, smspackage_master c where (a.client_id=b.client_id and b.package_id = c.package_id)"
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
    const { fromDate, toDate } = req.body;
    query = "select a.client_id, a.client_firstname, a.client_lastname, b.txn_date, b.order_id, b.package_id, b.total_amount_paid, b.payment_status_code from portal_clients_master a, clients_payments_history b where (a.client_id=b.client_id and ( b.txn_date BETWEEN ? AND ? + interval 1 day)) "
    await db.query(query, [fromDate, toDate], function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}


module.exports.getpurchaseDetailed = async function (req, res) {
    const { order_id, package_id } = req.body
    console.log(order_id, package_id)
    query = "select a.client_id, a.client_firstname, a.client_lastname, a.client_email, a.client_mobile_number, a.client_city, a.client_state, b.coupon_id, b.coupon_amount, b.txn_date,b.order_id, c.package_name, c.package_sms_credits, b.payment_mode, b.payment_status_code, b.payment_gateway_txn_id, b.payment_gateway_txn_ref from portal_clients_master a, clients_payments_history b, smspackage_master c where (a.client_id = b.client_id and b.order_id =? and c.package_id =? )"
    await db.query(query, [order_id, package_id], function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}

module.exports.getSalesData = async function (req, res) {
    const { fromDate, toDate } = req.body;

    query = "select a.txn_date,a.payment_status_code, a.package_id, b.package_name, a.total_amount_paid, a.payment_mode from clients_payments_history a, smspackage_master b where (a.package_id = b.package_id and ( a.txn_date BETWEEN ? AND ?  + interval 1 day)) "
    await db.query(query, [fromDate, toDate], function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}




module.exports.updatePaymentStatus = async function (req, res) {
    const { payment_status, client_id, order_id, add_balance } = req.body;
    console.log(payment_status, order_id, client_id, add_balance)
    query = "update clients_payments_history a, clients_sms_credits_history b, smspackage_master c set a.payment_status_code =?, b.sms_credits_quantity = c.package_sms_credits, b.add_balance =? where ((a.client_id =? and a.order_id =?) and (a.client_id=b.client_id and a.order_id = b.order_id) and b.package_id=c.package_id)"
    await db.query(query, [payment_status, add_balance, client_id, order_id], function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}


module.exports.getplanexpirycontacts = async function (req, res) {
    const {partner_id}=req.body;
    const { fromDate, toDate } = req.body;

    query = "SELECT a.client_id, b.client_firstname, b.client_lastname, b.client_district,a.user_mobile_number, a.account_type, a.account_plan_id, a.plan_activation_date, a.plan_expiry_date FROM `portal_users` a, portal_clients_master b where a.client_id=b.client_id and  (plan_expiry_date BETWEEN ? AND ? + interval 1 day ) and a.partner_id =?"
    await db.query(query, [fromDate, toDate,partner_id], function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}

module.exports.getplanexpirycontactsAll = async function (req, res) {
    const {partner_id}=req.body;
    query = "SELECT a.client_id, b.client_firstname, b.client_lastname, b.client_district,a.user_mobile_number, a.account_type, a.account_plan_id, a.plan_activation_date, a.plan_expiry_date, c.fcm_token FROM `portal_users` a, portal_clients_master b, app_token_table c where a.client_id=b.client_id and a.partner_id =? and c.agent_id = a.client_id ORDER BY `a`.`plan_activation_date` DESC"
    await db.query(query,[partner_id] ,function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}


module.exports.insertnotifications = (req, res) => {
    const partner_id=req.params.partner_id;
    const {client_ids,message}= req.body;
    console.log(client_ids)
    if(!client_ids){
        res.status(200).send({status:false, message:'error in adding push notifications'})
    }
else{
    client_ids.forEach(myFunction);
    function myFunction(item) {
        const nid = crypto.randomBytes(4).toString("hex");
        var values = {
            nid: nid,
            partner_id: partner_id,
            client_id: item,
            title: 'Upgrade Premium',
            message: message,
            action: '11',
            url: 'nil',
            status: 'new'
        }
        console.log(values)
        var sql = "INSERT INTO portal_mynotifications SET ?"
    db.query(sql, [values], function (error, results, fields) {
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


module.exports.registeredcontactstracking= async function (req, res) {
    const { fromDate, toDate } = req.body;

    console.log(fromDate,toDate)
    query = "SELECT a.CLIENT_id as 'ClientID', CONCAT(b.client_firstname, ' ', b.client_lastname) as 'ClientName', a.user_mobile_number as 'MobileNumber', b.client_district as 'District', a.account_plan_id as 'PlanID', a.account_type as 'AccountType', a.created_on as 'DateofRegn', a.plan_activation_date as 'DateofActivation', a.plan_expiry_date as 'DateofExpiry' FROM `portal_users` a, portal_clients_master b where a.client_id=b.client_id and (a.created_on between ? and ? + interval 1 day) order by a.created_on asc, a.account_plan_id asc"
    await db.query(query, [fromDate, toDate], function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}

module.exports.getTodayregisterdData= async function (req, res) {
    query = "SELECT a.CLIENT_id as 'ClientID', CONCAT(b.client_firstname, ' ', b.client_lastname) as 'ClientName', a.user_mobile_number as 'MobileNumber', b.client_district as 'District', a.account_plan_id as 'PlanID', a.account_type as 'AccountType', a.created_on as 'DateofRegn', a.plan_activation_date as 'DateofActivation', a.plan_expiry_date as 'DateofExpiry' FROM `portal_users` a, clients_master b where a.client_id=b.client_id and (a.created_on between CURRENT_date and CURRENT_DATE  + interval 1 day) order by a.created_on asc, a.account_plan_id asc"
    await db.query(query, function (err, result, fields) {
        if (err) throw err;
        if(!result.length){
            res.status(200).send({ status: 'false', message: 'No Client Registered Today' })
        }else{
            res.send({
                "code": 200,
                "success": "users data ",
                "data": result
            });
        }
      
    });
}