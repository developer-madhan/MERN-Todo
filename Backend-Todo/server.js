// Express js
// Using express
const express = require("express");
const mongoose = require("mongoose");

// create an instance of express
const app = express();
app.use(express.json());

// Define a route
// Test is it working?
// app.get("/", (req, res) => {
//   res.send("hello world!");
// });

// sample in-memory stolrage for todo items
// let todos = [];

// connecting mongodb
mongoose
  .connect("mongodb://localhost:27017/todo-app")
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err);
  })

//   create schema
const todoSchema = new mongoose.Schema({
    title:String,
    description:String
})

// create modal
const todoModal =mongoose.model('Todo',todoSchema);

// Create a new todo item
app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    description,
  };
  todos.push(newTodo);
  console.log(todos);
  res.status(201).json(newTodo);
});

// get all items
app.get("/todos", (req, res) => {
  res.json(todos);
});

// start the server
const port = 8000;
app.listen(port, () => {
  console.log("Server is listening to port" + port);
});
