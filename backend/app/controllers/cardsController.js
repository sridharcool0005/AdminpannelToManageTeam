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

    const {fullName,designation,branch,city,district,mobilenumber,whatsaap,email,website,facebookid}=req.body;

    const image = await Jimp.read("digitalprofiles/12.jpeg");

    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const font3= await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
    await image.print(
        font,
        30,
        30,
        {
            text:fullName,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
          },
 
        300,500,
        (err, image, { x, y }) => {

            image.print(font2, 30,20+500,designation+","+"LIC of India", 400,400);
            image.print(font3, 750,60+60,"Branch:"+" "+branch,500,400);
            image.print(font3, 800,60+110,city+","+district,400,400);
            image.print(font3, 750,60+162,mobilenumber,400,400);
            image.print(font3, 750,60+245,whatsaap,400,400);
            image.print(font3, 750,60+320,email,400,400);
            image.print(font3, 750,60+400,facebookid,400,400);
            image.print(font3, 600,60+450,website,400,400);
        }, 
     
 
      
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
            opacitySource: 2,

        })

        await image.writeAsync(`test/${Date.now()}_waterMark_150x150.png`).then(response => {
            res.status(200).send({status:'success', message:'Image Processing Completed'});
        }).catch(error => {
            res.status(200).send({status:'error', message:'error in image processing'})
        })
    }
    waterMark('images/logo.png');
    image.write("digitalprofiles/edited.png");

    
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