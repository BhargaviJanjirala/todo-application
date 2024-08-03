const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("TODO", todoSchema);
