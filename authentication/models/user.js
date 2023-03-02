const mongoose = require('mongoose')

const userSchema= mongoose.Schema({
    username:{type:String},
    password:{type:String},
    googleId:{type:String},
    secret:{type:[String]}
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel