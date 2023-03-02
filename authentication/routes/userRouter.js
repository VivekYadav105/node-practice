const {Router} = require('express')
const {loginPage,registerPage,homePage,newSecretPage,secretsPage,registerUser,loginUser} = require('../controller/userController')

const userRouter = Router()

userRouter.route('/').get(homePage)
userRouter.route('/register').get(registerPage).post(registerUser)
userRouter.route('/login').get(loginPage).post(loginUser)
userRouter.route('/new').get(newSecretPage)
userRouter.route('/secrets').get(secretsPage)

module.exports = userRouter