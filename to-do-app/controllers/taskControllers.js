const TaskModel = require("../models/task");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");

const getTasks = async (req, res, next) => {
  try {
    if (!req) {
      throw new createError(500, "something went wrong try again later");
    }
    const tasks = await TaskModel.find({});
    res.render("home.pug", { tasks: tasks, type: "all" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

const addTasks = async (req, res, next) => {
  const data = await req.body;
  try {
    const task = await TaskModel.create({ name: req.body.taskName });
    res
      .redirect("/task/")
      .status(200)
      .json({ task: data, success: true, message: "added successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      task: false,
      message: "adding to db failed",
      reason: err.message,
    });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const value = await req.body.complete;
    if (!id) throw new createError(400, `id is not recieved`);
    if (!isValidObjectId(id)) {
      throw new createError(400, `given id is not valid`);
    }
    const task = await TaskModel.find({ _id: id });
    if (!task.length)
      throw new createError(404, `task with id:${id} is not found`);
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { $set: { isCompleted: value } },
      { new: true }
    );
    if (updatedTask) {
      res.redirect("/task").status(200).json({
        message: "task updated succesfully",
        "update task": updatedTask,
        success: true,
      });
    }
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message, status: err.status || 500 });
  }
};

const editTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const value = await req.body.taskName;
    if (!id) throw new createError(400, `id is not recieved`);
    if (!isValidObjectId(id)) {
      throw new createError(400, `given id is not valid`);
    }
    const task = await TaskModel.find({ _id: id });
    if (!task.length)
      throw new createError(404, `task with id:${id} is not found`);
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { $set: { name: value } },
      { new: true }
    );
    if (updatedTask)
      res.redirect("/task").status(200).json({
        message: "task updated succesfully",
        "update task": updatedTask,
        success: true,
      });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message, status: err.status || 500 });
  }
  res.redirect("/task");
};

const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new createError(400, `id is not recieved`);
    if (!isValidObjectId(id)) {
      throw new createError(400, `given id is not valid`);
    }
    const task = await TaskModel.find({ _id: id });
    if (!task.length)
      throw new createError(404, `task with id:${id} is not found`);
    const updatedTask = await TaskModel.findByIdAndRemove(id, { new: true });
    if (updatedTask) {
      res.redirect("/task").status(200).json({
        message: "task removed succesfully",
        "removed task": updatedTask,
        success: true,
      });
    }
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message, status: err.status || 500 });
  }
};

async function getEditForm(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) throw new createError(400, `id is not recieved`);
    if (!isValidObjectId(id)) {
      throw new createError(400, `given id is not valid`);
    }
    const tasks = await TaskModel.find({ _id: id });
    if (!tasks.length)
      throw new createError(404, `task with id:${id} is not found`);
    res.render("edit.pug", { tasks: tasks });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message, status: err.status || 500 });
    console.log(err);
  }
}

async function view(req, res, next) {
  try {
    if (!req) {
      throw new createError(500, "something went wrong");
    }
    console.log(req);
    var query = {};
    const type = await req.body.type;
    console.log(type);
    if (type === "completed") {
      query = { isCompleted: true };
    } else if (type === "pending") {
      query = { isCompleted: false };
    } else {
      query = {};
    }
    const tasks = await TaskModel.find(query);
    console.log(query);
    var msg = "";
    if (!tasks.length) {
      msg = `no task left to complete`;
    } else {
      const count = tasks.length;
      if (type === "completed") {
        msg = `${count} tasks completed`;
      } else {
        msg = `${count} tasks are given`;
      }
    }
    res.render("home.pug", { tasks: tasks, msg: msg, type: type });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = {
  addTasks,
  deleteTask,
  editTask,
  updateTask,
  getEditForm,
  view,
  getTasks
};
