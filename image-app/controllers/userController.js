const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user')

exports.login = (req,res,next)=>{
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

exports.loginPage = (req,res,next)=>{
    res.render('login.pug')
} 
exports.signupPage = (req,res,next)=>{
    res.render('signup.pug')
} 
exports.forgotPasswordPage = (req,res,next)=>{
    res.render('forgotpassword.pug')
} 
