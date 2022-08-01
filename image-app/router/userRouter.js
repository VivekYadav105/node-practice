const express  = require("express")

const {login,verify,forgotPassword,resetPassword,signup} = require('../controllers/userController')

require('dotenv').config()

const userRouter = express.Router()

userRouter.route('/login').get(login).post(login)
userRouter.route('/signup').post(signup).get(signup)
userRouter.route('/verify').post(verify).get(verify)
userRouter.route('/forgotpassword').post(forgotPassword).get(forgotPassword)
userRouter.route('/resetpassword').post(resetPassword).get(resetPassword)

module.exports = {userRouter} 