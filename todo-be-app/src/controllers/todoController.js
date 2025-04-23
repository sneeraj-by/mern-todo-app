const Todo = require("../models/todoModel");

exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      userId: req.body.userId,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }
    res.json(todos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
