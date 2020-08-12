let express = require('express'),
    multer = require('multer');
router = express.Router();
const fs = require("fs")
var mysql = require('mysql');
// Multer File upload settings
const DIR = './digitalprofiles';
if (!fs.existsSync(DIR)) {
    fs.mkdirSync(DIR);
}

const crypto = require("crypto");
const templateModel = require('../models/digiprofileModel');
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

router.post('/uploaddcprofile', upload.single('avatar'), (req, res, next) => {
    const { title,category } = req.body;
    const image_id  = crypto.randomBytes(3).toString("hex");
    const url = req.protocol + '://' + req.get('host');
    const image_filename = url + '/' + req.file.filename
    db.sync().then(function () {
        var newTemplate = {
            image_id:image_id,
            image_title: title,
            image_filename: image_filename,
            image_category: category
        };

        return templateModel.create(newTemplate).then(function () {

            res.status(201).json({ status: 'success', message: 'newTemplate created!' });
        });
    }).catch(function (error) {
        console.log(error);
        res.status(403).json({ message: 'data already exists!' });
    });
})

const cardsController= require('../controllers/cardsController')

router.get('/getAllCards', cardsController.getAllCards);



module.exports = router;
