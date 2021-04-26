var mysql = require('mysql');
const request = require('request');


var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
  debug: false,
});



module.exports.getdltcumulativelist = async function (req, res) {
    query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', c.mobilenumber as 'MobileNumber', concat(c.firstname,  ' ', c.lastname) as 'ClientName', a.tid as 'TemplateID', if (b.status = 0, 'Pending', 'Rejected') as 'Status' FROM `portal_clients_assets` a, portal_mytemplates b, app_clients_master c where b.status <> '1' and a.client_id = c.client_id and a.tid=b.tid"
    await database.query(query, function (err, result, fields) {
      if (err) throw err;
      if (!result.length) {
        res.status(400).send({ status: 'false', message: 'No data found' });
      } else {
        res.status(200).send({ status: 'success', data: result })
      }
    });
  }
  


module.exports.getdltlist = async function (req, res) {
  const { fromDate, toDate}=req.body;
    query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', c.mobilenumber as 'MobileNumber', concat(c.firstname,  ' ', c.lastname) as 'ClientName', a.tid as 'TemplateID', if (b.status = 0, 'Pending', 'Rejected') as 'Status' FROM `portal_clients_assets` a, portal_mytemplates b, app_clients_master c where b.status <> '1' and a.client_id = c.client_id and a.tid=b.tid and a.created_on between ? and ? + interval 1 day ORDER BY a.created_on DESC"
    await database.query(query,[fromDate,toDate], function (err, result, fields) {
      if (err) throw err;
      if (!result.length) {
        res.status(400).send({ status: 'false', message: 'No data found' });
      } else {
        res.status(200).send({ status: 'success', data: result })
      }
    });
  }
  

  module.exports.getdltdocmentdetails = async function (req, res) {
    const { client_id, tid}=req.body;
      query = "SELECT a.created_on as 'DateSubmitted', a.tid as 'TemplateID', b.message as 'Message', if (b.status = 0, 'P', 'R') as 'Status', a.review_comments as 'ReviewComments' FROM portal_clients_assets a, portal_mytemplates b where (a.client_id =? and a.tid =?) and a.tid=b.tid"
      await database.query(query,[client_id,tid], function (err, result, fields) {
        if (err) throw err;
        if (!result.length) {
          res.status(400).send({ status: 'false', message: 'No data found' });
        } else {
          res.status(200).send({ status: 'success', data: result })
        }
      });
    }


    module.exports.updatedltstatus = async function (req, res) {
      const { client_id, tid,message,status}=req.body;
      let alertmessage={}
        query = "update `portal_clients_assets` a, portal_mytemplates b set a.review_comments =?, b.status =? where a.client_id =? and a.tid =? and a.tid=b.tid"
        await database.query(query,[message,status,client_id,tid], function (err, result, fields) {
          if (err) throw err;
          if (result.affectedRows <= 1) {
            res.status(400).send({ status: 'false', message: 'No data found' });
          } else {
            if(status==1){
              alertmessage='DLT Template Approved Successfully'
            }else{
              alertmessage='DLT Template Rejected'
            }
            res.status(200).send({ status: 'success',message:alertmessage});
          }
        });
      }




      

module.exports.getdltcertificate = async (req, res) => {
 
  const {client_id,authkey,tid} = req.body;
  const options = {
    url: "https://portalapi.nutansms.in/forceDownloadPDF.php",
    qs: { client_id: client_id, tid:tid },
    headers: {
      'Authorization': '6e21e55fced99d96'
    },
    json: true,
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
