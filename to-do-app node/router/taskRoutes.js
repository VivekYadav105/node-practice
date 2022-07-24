const { Router } = require("express");
const {
  addTasks,
  updateTask,
  deleteTask,
  editTask,
  getEditForm,
  view
} = require("../controllers/taskControllers");
const taskRouter = Router();
const TaskModel = require("../models/task");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");

taskRouter.get("/", async (req, res, next) => {
  const tasks = await TaskModel.find({});
  res.render("home.pug", { tasks: tasks,type:"all"});
});

taskRouter.post("/add", (req, res, next) => {
  addTasks(req, res, next);
});

taskRouter.post("/update/:id", async (req, res, next) => {
  updateTask(req, res, next);
});

taskRouter.post("/delete/:id", async (req, res, next) => {
  deleteTask(req, res, next);
});

taskRouter.get("/edit/:id", async (req, res, next) => {
  getEditForm(req, res, next);
});

taskRouter.post("/edit/:id", async (req, res, next) => {
  editTask(req, res, next);
});

taskRouter.post("/view",async(req,res,next)=>{(view(req,res,next))
})

module.exports = taskRouter;
