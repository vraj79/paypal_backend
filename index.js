const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskRouter = require("./routes/TaskRouter");
const UserRouter = require("./routes/UserRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", UserRouter);
app.use("/task", TaskRouter);

const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://Vraj:Vishal123@cluster0.n6fk1.mongodb.net/paypal?retryWrites=true&w=majority"
    )
    .then(() => console.log("💻 Mondodb Connected"))
    .catch((err) => console.error(err));
};

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

const port = 8080;

app.listen(port, connectDB(), () =>
  console.log(`Server running on port ${port} 🔥`)
);
