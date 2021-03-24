var fetch = require('node-fetch');
const crypto = require("crypto");
let express = require('express'),
  multer = require('multer');
const fs = require("fs")
var mysql = require('mysql');
// Multer File upload settings
const DIR = './apkuploads';
if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR);
}



var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
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

let middleware = upload.single('avatar');
let soundfile="";
let imagefile="";

console.log(middleware)
module.exports.uploadaudiofile = (req, res, next) => {
  let controller = () => {
    console.log(req.body, req.files);
    const url = req.protocol + '://' + req.get('host');
    soundfile = url + '/' + req.file.filename;
   res.send({ status:'success', message:'file uploaded successfully'})
  };
  middleware(req, res, controller);
}

let imgmiddleware = upload.single('image');
module.exports.imagefileupload = (req, res, next) => {
  let controller = () => {
    console.log(req.body, req.files);
    const url = req.protocol + '://' + req.get('host');
    imagefile = url + '/' + req.file.filename;
   res.send({ status:'success', message:'image uploaded successfully'})
  };
  imgmiddleware(req, res, controller);
}


module.exports.send_fcm_notifications = async function (req, res) {
  const { title, message, user_tokens } = req.body;
  console.log(user_tokens)
  // notification object with title and text
  var notification = {
    'title': title,
    'text': message,
    'sound':soundfile,
    'image':imagefile
  };

  // fcm device tokens array
  var fcm_tokens = user_tokens

  var notification_body = {
    'notification': notification,
    'registration_ids': fcm_tokens
  }

  fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
      // replace authorization key with your key
      Authorization: 'key=' + 'AAAAforQoAY:APA91bGNTuHwcE-IXp2U1KrePItpNfe2kBT3rj6WciQtSFuC7t7EAZgECb6US67tagjnv5L-IoZUFxCru7LQVLYUY1o-VJ79MWWzZFFKT4Gqrfxfd4eQropQ_wvUqCfD8aVMZ3cAc-i7',
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(notification_body)
  }).then(function (response) {
    // console.log(response)
    if (response.status == '200') {
       this.savenotifications(req)
      res.send({ status: response.status, message: 'Notification Sent  successfully' });
    } else {
      this.savenotifications(req)
      res.send({ status: response.status, message: 'Error in sending push notification' })
    }

  }).catch(function (error) {
    console.error(error);
  })
}


savenotifications = (req,res) => {
  const {client_ids,message,title}= req.body;
  // console.log(client_ids)
  if(!client_ids){
      res.status(200).send({status:false, message:'error in adding push notifications'})
  }
else{
  client_ids.forEach(myFunction);
  function myFunction(item) {
      const nid = crypto.randomBytes(4).toString("hex");
      var values = {
          nid: nid,
          partner_id: 'nutantek',
          client_id: item,
          title: title,
          message: message,
          action: '11',
          url: 'nil',
          status: 'new',
          sound_file_path:soundfile,
          image_file_path:imagefile,
          push_status:'2'
      }
      // console.log(values)
      var sql = "INSERT INTO portal_mynotifications SET ?"
  database.query(sql, [values], function (error, results, fields) {
      if (error) throw error;
  });
  }

}
  
};