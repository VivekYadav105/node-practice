const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path")
require("dotenv").config();

const app = express();

const connection = require("./connection");
const {userRouter} = require("./router/userRouter");
const imageRouter = require("./router/imageRouter")

const PORT = process.env.PORT || 4000;

app.use(morgan("short"));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

// // app.get('/',(req,res)=>{res.redirect('/user/login')})
// app.use("/user", userRouter);
app.use("/image",imageRouter)
app.set('/views',path.join(__dirname,'views'))
app.set('view_engine','pug')
app.use('/public',express.static(path.join(__dirname,'/public')))

connection(process.env.MONGO_URL, () => {
  app.listen(PORT, () => {
    console.log(`listening to ${PORT}`);
  });
});
