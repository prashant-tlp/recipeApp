const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const regAdmin = mongoose.model("admins", adminSchema);
module.exports = regAdmin;
