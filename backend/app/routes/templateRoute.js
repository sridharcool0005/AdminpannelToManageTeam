let express = require('express'),
  multer = require('multer');
  router = express.Router();
  const fs = require("fs")
  var mysql = require('mysql');
// Multer File upload settings
const DIR = './myfolder';
if (!fs.existsSync(DIR)){
    fs.mkdirSync(DIR);
}


const templateModel = require('../models/templatelistModel');
const db = require('../services/database')
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
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == 'applcation/pdf') {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  //   }
  // }
});

router.post('/addTemplateType', upload.single('avatar'), (req, res, next) => {
    const {event_code,display_name}= req.body;
    console.log(event_code,display_name)
  const url = req.protocol + '://' + req.get('host')

   const  image_filename=url+'/' + req.file.filename
   console.log(image_filename)
   
  
   db.sync().then(function () {
    var newTemplate = {
        event_code: event_code,
        display_name: display_name,
        image_filename: image_filename,
    };

    return templateModel.create(newTemplate).then(function () {
   
        res.status(201).json({status:'success', message: 'newTemplate created!' });
    });
}).catch(function (error) {
    console.log(error);
    res.status(403).json({ message: 'data already exists!' });
});
})


const templatescontroller= require('../controllers/templatescontroller')
router.get('/getevents', templatescontroller.geteventCodes);
router.get('/getAllTemplateTypes', templatescontroller.getAllTemplateTypes);
router.post('/addnewTemplate', templatescontroller.addnewTemplate);
router.post('/getsmsTemplates', templatescontroller.getsmsTemplates)

module.exports = router;
