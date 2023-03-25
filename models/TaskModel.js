const { Schema, model } = require("mongoose");

const TaskSchema = Schema({
  taskName: { type: String},
  taskType:{type:String,emum:["Bug","Feature","Story"],default:"Story"},
  assignedTo:{type:Schema.Types.ObjectId,ref:"User"},
  sprint:{type:String,enum:["sprint1","sprint2","sprint3","sprint4"],default:"sprint1"},
  status:{type:String,enum:["","In_Progress","Done"],default:""}
});

const TaskModel = model("Task", TaskSchema);
module.exports = TaskModel;
