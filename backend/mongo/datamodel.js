const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  rname: String,
  email: String,
  ingredients:String,
  method:String,
  image: String,
});

const regData = mongoose.model("recipees", dataSchema);
module.exports = regData;
