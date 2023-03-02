const express  = require("express")

const {loginPage,signupPage,forgotPasswordPage,login,verify,forgotPassword,resetPassword,signup} = require('../controllers/userController')

require('dotenv').config()

const userRouter = express.Router()

userRouter.route('/login').get(loginPage).post(login)
userRouter.route('/signup').post(signup).get(signupPage)
userRouter.route('/verify').post(verify).get(verify)
userRouter.route('/forgotpassword').post(forgotPassword).get(forgotPasswordPage)
userRouter.route('/resetpassword').post(resetPassword).get(resetPassword)

module.exports = {userRouter} 