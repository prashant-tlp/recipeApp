const mongoose = require("mongoose");
const databaseName = "Recipee";
try {
  mongoose.connect("mongodb://127.0.0.1:27017/" + databaseName).then(() => {
    console.log("connected to database successfully");
  });
} catch (error) {
  console.log("failed to connect to the database");
}
