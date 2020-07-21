var mysql = require('mysql');


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'smsportal',
    debug: false,

});

exports.getclients = async function (req, res) {
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

exports.getuserdata = async function (req, res) {
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

exports.getuserDetails = async function (req, res) {
    const client_id=req.body.client_id;
    query = "SELECT * FROM users WHERE client_id=?"
    await db.query(query,[client_id] ,function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}

exports.updateclientData = async function (req, res) {
    
    const {client_id,user_smsgateway_authkey,user_smsgateway_sender_id,user_smsgateway_unicode,account_type,account_status }=req.body
    var sql = "UPDATE users SET  user_smsgateway_authkey =?,user_smsgateway_sender_id =?,user_smsgateway_unicode =?,account_type =?,account_status =? WHERE  client_id =?";
    await db.query(sql,[user_smsgateway_authkey,user_smsgateway_sender_id,user_smsgateway_unicode,account_type,account_status,client_id] ,function (err, result, fields) {
       
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "Data updated Sucessfully",
        });
    });
}


exports.deleteclient = (req, res) => {
    const client_id=req.body.client_id;
    db.query('DELETE FROM `users` WHERE `client_id`=?', 
        [client_id], function (error, results, fields) {
            if (error) throw error;
            res.send({
                "code": 200,
                "success": "Data updated Sucessfully",
            });
    });
};

exports.getsmsCreditHistory = async function (req, res) {
    query = "SELECT * FROM clients_sms_credits_history"
    await db.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}
