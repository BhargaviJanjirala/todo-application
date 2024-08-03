// const TodoModel = require("../models/TodoModel");
// module.exports.getTodo = async (req, res) => {
//   const todo = await TodoModel.find();
//   res.send(todo);
// };

// module.exports.saveTodo = async (req, res) => {
//   const { text } = req.body;
//   TodoModel.create({ text }).then((data) => {
//     console.log("Added Successfully");
//     console.log(data);
//     res.send(data);
//   });
// };
// module.exports.updateTodo = async (req, res) => {
//   const { id } = req.params; // Extract the ID from the request parameters
//   const { text } = req.body; // Extract the updated text from the request body

//   try {
//     // Find the to-do item by ID and update it with the new text
//     await TodoModel.findByIdAndUpdate(id, { text });
//     res.send("Updated Successfully");
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).send("Error updating the todo item"); // Send an error response to the client
//   }
// };

// // Delete a to-do item by ID
// module.exports.deleteTodo = async (req, res) => {
//   const { id } = req.params; // Extract the ID from the request parameters

//   try {
//     // Find the to-do item by ID and delete it
//     await TodoModel.findByIdAndDelete(id);
//     res.send("Deleted Successfully");
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).send("Error deleting the todo item"); // Send an error response to the client
//   }
// };
const TodoModel = require("../models/TodoModel");

// Fetch all todos for a specific user
module.exports.getTodo = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).send("User ID is required");
  }

  try {
    const todos = await TodoModel.find({ user_id });
    res.send(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching todos");
  }
};

// Fetch a single todo by its unique ID
module.exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).send("User ID is required");
  }

  try {
    const todo = await TodoModel.findOne({ _id: id, user_id });
    if (!todo) {
      return res.status(404).send("Todo not found or not owned by user");
    }
    res.send(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching the todo item");
  }
};

// Save a new todo item
module.exports.saveTodo = async (req, res) => {
  const { text, user_id } = req.body;

  if (!user_id) {
    return res.status(400).send("User ID is required");
  }

  try {
    const todo = await TodoModel.create({ text, user_id });
    res.send(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving the todo item");
  }
};

// Update a todo item
module.exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, user_id } = req.body;

  try {
    const todo = await TodoModel.findOneAndUpdate(
      { _id: id, user_id },
      { text },
      { new: true }
    );
    if (!todo) {
      return res.status(404).send("Todo not found or not owned by user");
    }
    res.send(todo);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating the todo item");
  }
};

// Delete a todo item
module.exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const todo = await TodoModel.findOneAndDelete({ _id: id, user_id });
    if (!todo) {
      return res.status(404).send("Todo not found or not owned by user");
    }
    res.send("Deleted Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting the todo item");
  }
};
