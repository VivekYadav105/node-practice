const { Router } = require("express");
const {
  getTasks,
  addTasks,
  updateTask,
  deleteTask,
  editTask,
  getEditForm,
  view
} = require("../controllers/taskControllers");

const taskRouter = Router();

taskRouter.get("/",getTasks);
taskRouter.post("/add", addTasks);
taskRouter.post("/update/:id",updateTask);
taskRouter.post("/delete/:id", deleteTask);
taskRouter.get("/edit/:id",getEditForm);
taskRouter.post("/edit/:id",editTask);
taskRouter.post("/view",view)

module.exports = taskRouter;
