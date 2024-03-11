const express = require("express");
const route = express.Router();

////////////////////importing Admin model/////////////
const regAdmin = require("../mongo/adminmodel");

/////////////////// register admin ////////////
route.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    const register = await new regAdmin({ name, email, password });
    const result = await register.save();
    res.send({ message: "admin register successful", userdata: result });
  
});

module.exports = route;
