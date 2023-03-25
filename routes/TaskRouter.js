const express = require("express");
const TaskModel = require("../models/TaskModel");
const TaskRouter = express.Router();

TaskRouter.post("/", async (req, res) => {
  try {
    let task = new TaskModel(req.body);
    await task.save();
    return res.status(201).json({ message: "Task Created", task });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

TaskRouter.get("/", async (req, res) => {
  const { status } = req.query;
  try {
    if (status) {
      let tasks = await TaskModel.find({ status: status });
      return res.status(200).json(tasks);
    } else {
      let tasks = await TaskModel.find();
      return res.status(200).json(tasks);
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

TaskRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let task = await TaskModel.findById(id);
    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

TaskRouter.get("/byStatus", async (req, res) => {
  const { status } = req.query;
  try {
    const taskByStatus = await TaskModel.find({ status: status });
    return res.status(200).send(taskByStatus);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

TaskRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let task = await TaskModel.findByIdAndUpdate({ _id: id }, { ...req.body });
    return res.status(200).json({ msg: "Task Updated" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

TaskRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let task = await TaskModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Task Deleted" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = TaskRouter;
