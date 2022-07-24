const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const createConnection = require("./connection");

const app = express();
const PORT = process.env.PORT || 4000;
const taskRouter = require("./router/taskRoutes");

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

const start = async () => {
  try {
    createConnection(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log("connected to the port" + PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

app.use(morgan("tiny"));
app.use("/task", taskRouter);

app.use('static',express.static(path.join(__dirname,'static')))
console.log(path.join(__dirname,"static"))
app.set("views", path.join(__dirname, "views"));
app.set("view_engine", "pug");


//function to start the app
start();
