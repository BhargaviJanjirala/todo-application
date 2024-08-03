const { Router } = require("express");
const {
  getTodo,
  getTodoById,
  saveTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/TodoController");

const router = Router();

// Fetch all todos for a specific user
router.get("/todos", getTodo);

// Fetch a single todo by its unique ID
router.get("/todos/:id", getTodoById);

// Create a new todo for a specific user
router.post("/todos", saveTodo);

// Update a todo by its ID for a specific user
router.put("/todos/:id", updateTodo);

// Delete a todo by its ID for a specific user
router.delete("/todos/:id", deleteTodo);

module.exports = router;
