const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  //  unique: true,
  username: { type: String, required: true },
  score: { type: String, required: true },
});

module.exports = model("Result", userSchema);
