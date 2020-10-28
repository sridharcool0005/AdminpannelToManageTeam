var mysql = require('mysql');



var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'smsportal',
    debug: false,

});


module.exports.getallapkslist = async function (req, res) {
    query = "SELECT * FROM app_nutan_apks"
    await db.query(query, function (err, result, fields) {
        if (err) throw err;
        if (!result.length)  {
            res.status(200).send({status:'false' ,message: 'Your Data is Empty' });
          }else{
            res.status(200).send({status:'success' ,data:result})
          }
    });
}


module.exports.deleteapk = (req, res) => {
    const apk_id=req.body.apk_id;
    db.query('DELETE FROM `app_nutan_apks` WHERE `apk_id`=?', 
        [apk_id], function (error, results, fields) {
            if (error) throw error;
            res.send({
                "code": 200,
                "success": "Data updated Sucessfully",
            });
    });
};

module.exports.getallapkDownloadlist = async function (req, res) {
    const partner_id=req.params.partner_id;
    console.log(partner_id)
    const subject="APK Download"
    query = "SELECT * FROM  portal_users_query_feedback_test WHERE  partner_id =? and subject =?"
    await db.query(query,[partner_id,subject], function (err, result, fields) {
        if (err) throw err;
        if (!result.length)  {
            res.status(200).send({status:'false' ,message: 'Your Data is Empty' });
          }else{
            res.status(200).send({status:'success' ,result})
          }
    });
}

