const {Router} = require('express')
const {loginPage,registerPage,homePage,newSecretPage,secretsPage} = require('../controller/userController')

const userRouter = Router()

userRouter.route('/').get(loginPage)
userRouter.route('/register').get(registerPage)
userRouter.route('/home').get(homePage)
userRouter.route('/new').get(newSecretPage)
userRouter.route('/secrets').get(secretsPage)

module.exports = userRouter