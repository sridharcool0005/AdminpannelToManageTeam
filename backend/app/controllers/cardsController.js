var mysql = require('mysql');
const templateModel = require('../models/templatesModel');
const crypto = require("crypto");
const db = require('../services/database');
const Jimp = require("jimp");

var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'smsportal',
    debug: false,

});


module.exports.getAllCards = async function (req, res) {
    query = "SELECT * FROM dc_sample_images"
    await database.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send({
            "code": 200,
            "success": "users data ",
            "data": result
        });
    });
}




module.exports.createCard = async function (req, res) {

    const {fullName,designation,address}=req.body;
    console.log(fullName,designation,address)

    const image = await Jimp.read("images/3.jpg");

    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    const font2 = await Jimp.loadFont(Jimp.FONT_SANS_12_BLACK);
    await image.print(
        font,
        20,
        10,
 fullName+" "+designation,
        150, 200,
        (err, image, { x, y }) => {

            image.print(font2, x, y + 150, address, 200);
        }
    );


    async function waterMark(waterMarkImage) {
        let watermark = await Jimp.read(waterMarkImage);
        watermark = watermark.resize(320, 150);
        const image = await Jimp.read('images/edited-shapes.png');
        watermark = await watermark,
        {
            alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
            alignmentY: Jimp.VERTICAL_ALIGN_TOP
        }
        image.composite(watermark, 50, 50, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacityDest: 1,
            opacitySource: 1,

        })

        await image.writeAsync(`test/${Date.now()}_waterMark_150x150.png`).then(response => {
            res.status(200).send({status:'success', message:'Image Processing Completed'});
        }).catch(error => {
            res.status(200).send({status:'error', message:'error in image processing'})
        })
    }
    waterMark('images/logo.png');
    image.write("images/edited-shapes.png");

    
}

// async function waterMark(waterMarkImage) {
//     let watermark = await Jimp.read(waterMarkImage);
//     watermark = watermark.resize(320, 150);
//     const image = await Jimp.read('images/edited-shapes.png');
//     watermark = await watermark,
//     {
//         alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
//         alignmentY: Jimp.VERTICAL_ALIGN_TOP
//     }
//     image.composite(watermark, 50, 50, {
//         mode: Jimp.BLEND_SOURCE_OVER,
//         opacityDest: 1,
//         opacitySource: 1,

//     })

//     await image.writeAsync(`digitalprofiles/templatecard.png`).then(response => {
//         const url = req.protocol + '://' + req.get('host');
//        const image_filename= `templatecard.png`;
//        db.sync().then(function () {
//         var newTemplate = {
            
//             image_filename: url+'/'+image_filename,
//             image_id:'14454'
          
//         };

//         return templateModel.create(newTemplate).then(function () {

//             res.status(201).json({ status: 'success', message: 'newTemplate created!' });
//         });
//     })

//     }).catch(error => {
//         res.status(200).send({status:'error', message:'error in image processing'})
//     })
// }