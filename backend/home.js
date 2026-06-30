const express = require("express");
const mongoose = require("mongoose");

const route = express.Router();

const homeSchema = new mongoose.Schema({
  subtitle: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  role: {
    type: [String],
    required: true,
  },
  github: {
    type: String,
    unique: true,
    required: true,
  },
  linkedin: {
    type: String,
    unique: true,
    required: true,
  },
});

const Home = mongoose.model("Home", homeSchema);

// if the DB is empty , when we use findOne return null because it is empty
route.get("/", async (req, res) => {
  let home = await Home.findOne();
  if (!home) {
    // null
    home = await Home.create({
      // new + save
      subtitle: "Hello, World",
      name: "Your Name",
      role: ["MEAN Stack Developer"],
      github: "..",
      linkedin: "..",
    });
  }
  res.status(200).json(home);
});

route.put("/", async (req, res) => {
  const { subtitle, name, role, github, linkedin } = req.body;
  const home = await Home.findOneAndUpdate(
    {},
    { subtitle, name, role, github, linkedin },
    { new: true },
  );
  res.status(200).json(home);
});

module.exports = route;
