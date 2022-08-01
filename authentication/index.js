//level 1 --- register
//level 2 --- password ecncryption
//level 3 --- hashing

const cookieParser = require('cookie-parser')
const path = require('path')
const userRouter = require('./routes/userRouter')
const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.set('/static',express.static(path.join(__dirname,'static')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use('/user',userRouter)

app.listen(PORT,(err)=>{console.log("connected to port"+PORT)})