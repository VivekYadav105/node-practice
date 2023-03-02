const { string, date } = require("joi");
const { default: mongoose } = require("mongoose");

const image = mongoose.Schema({
    filename:{type:String,required:true},
    originalname:{type:String,required:true},
    path:{type:String,required:true},
    title:{type:String,required:true},
    type:{type:String,required:true},
    uploadedAt:{type:Date,default:Date.now(),immutable:true},
    modifiedAt:{type:Date,default:Date.now()},
    size:{type:Number}
})

const ImageModel = mongoose.model('image',image)

module.exports = ImageModel
