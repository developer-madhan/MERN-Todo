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
  });

//   create schema
const todoSchema = new mongoose.Schema({
  title: { required: true, type: String },
  description: String,
});

// create modal
const todoModal = mongoose.model("Todo", todoSchema);

// Create a new todo item
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  //   const newTodo = {
  //     id: todos.length + 1,
  //     title,
  //     description,
  //   };
  //   todos.push(newTodo);
  //   console.log(todos);
  try {
    const newTodo = new todoModal({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// get all items
app.get("/todos", async (req, res) => {
  try {
    const todos = await todoModal.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// update a todo item
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updatedTodo = await todoModal.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a todo item
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await todoModal.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// start the server
const port = 8000;
app.listen(port, () => {
  console.log("Server is listening to port" + port);
});
