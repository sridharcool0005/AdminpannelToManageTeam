var mysql = require('mysql');
const request = require('request');


var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
  debug: false,
});



module.exports.getAllbannerpromotions = async function (req, res) {
  const query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', b.mobilenumber as 'MobileNumber', concat(b.firstname, ' ', b.lastname) as 'ClientName', (CASE WHEN (a.status = 0) THEN ( 'Pending' ) WHEN (a.status = 1) THEN ( 'Active' ) ELSE( 'Suspended') END) AS 'Status' , c.order_id, d.package_name, a.from_datetime, a.to_datetime FROM paid_advertisements a, app_clients_master b, sales_history c, banner_price_master d where a.client_id = b.client_id and a.order_id = c.order_id and c.product_id = d.package_id and a.created_on between current_date - INTERVAL 15 day and current_date + interval 1 day ORDER BY a.created_on DESC"
  await database.query(query, function (err, result, fields){
    if (err) throw err;
    if (!result.length) {
      res.status(400).send({ status: 'false', message: 'No data found' });
    } else {
      res.status(200).send({ status: 'success',data: result })
    }
  });
}


module.exports.getAllbannerpromotionsbydatefilter = async function (req, res) {
  const {from_date, to_date}= req.body
  const query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', b.mobilenumber as 'MobileNumber', concat(b.firstname, ' ', b.lastname) as 'ClientName', (CASE WHEN (a.status = 0) THEN ( 'Pending' ) WHEN (a.status = 1) THEN ( 'Active' ) ELSE( 'Suspended') END) AS 'Status' , c.order_id, d.package_name, a.from_datetime, a.to_datetime FROM paid_advertisements a, app_clients_master b, sales_history c, banner_price_master d where a.client_id = b.client_id and a.order_id = c.order_id and c.product_id = d.package_id and a.created_on between ? - INTERVAL 15 day and ? + interval 1 day ORDER BY a.created_on DESC"
  await database.query(query,[from_date,to_date], function (err, result, fields){
    if (err) throw err;
    if (!result.length) {
      res.status(400).send({ status: 'false', message: 'No data found' });
    } else {
      res.status(200).send({ status: 'success',data: result })
    }
  });
}





module.exports.getpromotiondatadetailed = async function (req, res) {
  const order_id=req.body.order_id;
  const query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', b.mobilenumber as 'MobileNumber', concat(b.firstname, ' ', b.lastname) as 'ClientName', (CASE WHEN (a.status = 0) THEN ( 'Pending' ) WHEN (a.status = 1) THEN ( 'Active' ) ELSE( 'Suspended') END) AS 'Status' , c.order_id, d.package_name, a.from_datetime, a.to_datetime, a.review_comments, a.reviewed_on, a.banner_path FROM paid_advertisements a, app_clients_master b, sales_history c, banner_price_master d where a.order_id =? and a.client_id = b.client_id and a.order_id = c.order_id and c.product_id = d.package_id"
    await database.query(query,[order_id], function (err, result, fields) {
      if (err) throw err;
      if (!result.length) {
        res.status(400).send({ status: 'false', message: 'No data found' });
      } else {
        res.status(200).send({ status: 'success', data: result })
      }
    });
  }
  


  
module.exports.updatebannerpromotions = async function (req, res) {
  const {order_id,status,comments}=req.body;
  const query = "update paid_advertisements set review_comments =?, status =? where order_id =?"
    await database.query(query,[comments,status,order_id], function (err, result, fields) {
      if (err) throw err;
        res.status(200).send({ status: 'success',message:'Data updated successfully' })
    
    });
  }



  module.exports.getallbeontopdata = async function (req, res) {
    const query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', b.mobilenumber as 'MobileNumber', concat(b.firstname, ' ', b.lastname) as 'ClientName', (CASE WHEN (a.status = 0) THEN ( 'Pending' ) WHEN (a.status = 1) THEN ( 'Active' ) ELSE( 'Suspended') END) AS 'Status', c.order_id, d.package_name, a.from_datetime, a.to_datetime FROM paid_beontop_advertisements a, app_clients_master b, sales_history c, firstpage_promo_price_master d where a.client_id = b.client_id and a.order_id = c.order_id and c.product_id = d.package_id and a.created_on between current_date - INTERVAL 15 day and current_date + interval 1 day ORDER BY a.created_on DESC"
      await database.query(query, function (err, result, fields) {
        if (err) throw err;
        if (!result.length) {
          res.status(400).send({ status: 'false', message: 'No data found' });
        } else {
          res.status(200).send({ status: 'success', data: result })
        }
      });
    }


    module.exports.getbeondatadetailed = async function (req, res) {
      const order_id=req.body.order_id;
      const query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', b.mobilenumber as 'MobileNumber', concat(b.firstname, ' ', b.lastname) as 'ClientName', (CASE WHEN (a.status = 0) THEN ( 'Pending' ) WHEN (a.status = 1) THEN ( 'Active' ) ELSE( 'Suspended') END) AS 'Status' ,  c.order_id, d.package_name, a.from_datetime, a.to_datetime, a.review_comments, a.reviewed_on FROM paid_beontop_advertisements a, app_clients_master b, sales_history c, firstpage_promo_price_master d where a.order_id =? and a.client_id = b.client_id and a.order_id = c.order_id and c.product_id = d.package_id"
        await database.query(query,[order_id], function (err, result, fields) {
          if (err) throw err;
          if (!result.length) {
            res.status(400).send({ status: 'false', message: 'No data found' });
          } else {
            res.status(200).send({ status: 'success', data: result })
          }
        });
      }

      module.exports.updatebeontopstatus = async function (req, res) {
        const {order_id,status,comments}=req.body;
        const query = "update  paid_beontop_advertisements set review_comments =?, status =? where order_id =?"
          await database.query(query,[comments,status,order_id], function (err, result, fields) {
            if (err) throw err;
              res.status(200).send({ status: 'success',message:'Data updated successfully' })
          
          });
        }


        
  module.exports.getbeondatabydate = async function (req, res) {
    const {from_date, to_date}=req.body;
    const query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', b.mobilenumber as 'MobileNumber', concat(b.firstname, ' ', b.lastname) as 'ClientName', (CASE WHEN (a.status = 0) THEN ( 'Pending' ) WHEN (a.status = 1) THEN ( 'Active' ) ELSE( 'Suspended') END) AS 'Status', c.order_id, d.package_name, a.from_datetime, a.to_datetime FROM paid_beontop_advertisements a, app_clients_master b, sales_history c, firstpage_promo_price_master d where a.client_id = b.client_id and a.order_id = c.order_id and c.product_id = d.package_id and a.created_on between ? - INTERVAL 15 day and ? + interval 1 day ORDER BY a.created_on DESC"
      await database.query(query,[from_date,to_date], function (err, result, fields) {
        if (err) throw err;
        if (!result.length) {
          res.status(400).send({ status: 'false', message: 'No data found' });
        } else {
          res.status(200).send({ status: 'success', data: result })
        }
      });
    }

    module.exports.getbannerpromotionsbystatus = async function (req, res) {
      const {status,from_date,to_date}=req.body;
      const query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', b.mobilenumber as 'MobileNumber', concat(b.firstname, ' ', b.lastname) as 'ClientName', (CASE WHEN (a.status = 0) THEN ( 'Pending' ) WHEN (a.status = 1) THEN ( 'Active' ) ELSE( 'Suspended') END) AS 'Status' , c.order_id, d.package_name, a.from_datetime, a.to_datetime FROM paid_advertisements a, app_clients_master b, sales_history c, banner_price_master d where a.client_id = b.client_id and a.order_id = c.order_id and c.product_id = d.package_id and a.status =? and a.created_on between ? - INTERVAL 15 day and ? + interval 1 day ORDER BY a.created_on DESC"
        await database.query(query,[status,from_date,to_date], function (err, result, fields) {
          if (err) throw err;
          if (!result.length) {
            res.status(400).send({ status: 'false', message: 'No data found' });
          } else {
            res.status(200).send({ status: 'success', data: result })
          }
        });
      }

      module.exports.getbeondatabystatus = async function (req, res) {
        const {status,from_date,to_date}=req.body;
        const query = "SELECT a.created_on as 'DateSubmitted', a.client_id as 'ClientID', b.mobilenumber as 'MobileNumber', concat(b.firstname, ' ', b.lastname) as 'ClientName', (CASE WHEN (a.status = 0) THEN ( 'Pending' ) WHEN (a.status = 1) THEN ( 'Active' ) ELSE( 'Suspended') END) AS 'Status', c.order_id, d.package_name, a.from_datetime, a.to_datetime FROM paid_beontop_advertisements a, app_clients_master b, sales_history c, firstpage_promo_price_master d where a.client_id = b.client_id and a.order_id = c.order_id and c.product_id = d.package_id and a.status =? and a.created_on between ? - INTERVAL 15 day and ? + interval 1 day ORDER BY a.created_on DESC"
          await database.query(query,[status,from_date,to_date], function (err, result, fields) {
            if (err) throw err;
            if (!result.length) {
              res.status(400).send({ status: 'false', message: 'No data found' });
            } else {
              res.status(200).send({ status: 'success', data: result })
            }
          });
        }