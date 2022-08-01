const { date } = require('joi')
const mongoose = require('mongoose')

const user = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    DoB:{type:String,required:true},
    gender:{type:String,required:true},
    createdAt:{type:Date,default:Date.now(),immutable:true}
})

const userModel = mongoose.model('user',user)

module.exports = userModel

