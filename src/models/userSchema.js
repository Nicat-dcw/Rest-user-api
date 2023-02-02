const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userId: Number,
  username: String,
  createdAt: Date,
  password: String,
  token: String
});

module.exports = new mongoose.model("user", userSchema)
