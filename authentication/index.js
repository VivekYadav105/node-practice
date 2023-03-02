//level 1 --- register
//level 2 --- password ecncryption
//level 3 --- hashing

const cookieParser = require('cookie-parser')
const path = require('path')
const userRouter = require('./routes/userRouter')
const express = require('express')
const { default: mongoose } = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.set('/static',express.static(path.join(__dirname,'static')))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use('/',userRouter)

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true},(err)=>{err?console.log(err):console.log("connected to port")})

app.listen(PORT,(err)=>{console.log("connected to port"+PORT)})