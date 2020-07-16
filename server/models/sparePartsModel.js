const mongoose = require('mongoose');

var sparePartSchema = new mongoose.Schema({

   model:{
       type:string,
       required: true
   },
   year:{
       type:String,
       required: true
   },
   location:{
       type:String,
       required: true
   }
 
});


mongoose.model('sparePartSchema', sparePartSchema);