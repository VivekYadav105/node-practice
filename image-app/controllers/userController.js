const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user')

exports.login = (req,res,next)=>{
    // const {email,password} = await req.body
    // const user = await userModel.find({email:email,password:password})
    // if(user){
    //     res.cookie
    // }
    res.send('login controller')
}

exports.signup = (req,res,next)=>{
    res.send('signup controller')
}

exports.verify = (req,res,next)=>{
    res.send('verify controller')
}

exports.forgotPassword = (req,res,next)=>{
    res.send('forgotPassword controller')
}

exports.resetPassword = (req,res,next)=>{
    res.send('reset password controller')
}




