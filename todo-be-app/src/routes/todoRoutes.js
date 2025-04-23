const express = require("express");
const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create_todo", authMiddleware, createTodo);
router.get("/get_todo", authMiddleware, getTodo);
router.put("/update_todo/:id", updateTodo);
router.delete("/delete_todo/:id", deleteTodo);

module.exports = router;
