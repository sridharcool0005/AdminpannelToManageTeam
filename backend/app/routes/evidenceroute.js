

const request = require('request');
let express = require('express'),
    multer = require('multer');
router = express.Router();
const fs = require("fs")
var mysql = require('mysql');
// Multer File upload settings
const DIR = './paymentEvidenceproofs';
if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
}

var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'smsportal',
    debug: false,


});




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    // fileFilter: (req, file, cb) => {
    //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == 'applcation/pdf') {
    //     cb(null, true);
    //   } else {
    //     cb(null, false);
    //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //   }
    // }
});

postPaymentTransactionApi = 'https://www.portalapi.nutansms.in/postPaymentTransactionV4.php';

router.post('/postPaymentTransaction', upload.single('avatar'), (req, res, next) => {
    const { TxnOrderId, payment_mode,discountAmount,totalamount, payment_gateway_txn_ref, notes, payment_gateway_txn_id,client_id,authkey } = req.body;
    const url = req.protocol + '://' + req.get('host');
    const image_filename = url + '/' + req.file.filename

    const query = "INSERT INTO   portal_payment_evidences SET ?"

    var newTemplate = {
        order_id: TxnOrderId,
        evidence_link:image_filename,
    };

    database.query(query, newTemplate, function (error, result, fields) {
        if (error) throw error;
    })
            const options = {
              url: postPaymentTransactionApi,
              qs: { client_id: client_id },
              body: {
                order_id: TxnOrderId,
                payment_mode: payment_mode,
                payment_gateway_txn_ref: payment_gateway_txn_ref,
                payment_status_code: "success",
                payment_gateway_txn_id: payment_gateway_txn_id,//mappped during patym
                notes: notes,
                total_amount_paid:totalamount,
                discount_amount:discountAmount
              },
              headers: {
                'Authorization': authkey
              },
              method: 'POST',
        
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
          
        })
    
    






module.exports = router;
