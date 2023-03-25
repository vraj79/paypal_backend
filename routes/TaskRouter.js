const express = require("express");
const TaskModel = require("../models/TaskModel");
const TaskRouter=express.Router();

TaskRouter.post("/",async(req,res)=>{
    try {
        let task=new TaskModel(req.body);
        await task.save();
        return res.status(201).json({ message: 'Task Created',task });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

TaskRouter.get("/",async(req,res)=>{
    try {
        let tasks=await TaskModel.find();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

TaskRouter.get("/byStatus",async(req,res)=>{
    const {status}=req.query
    try {
        const taskByStatus=await TaskModel.find({status:status});
        return res.status(200).send(taskByStatus);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

module.exports=TaskRouter