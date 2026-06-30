const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const upload = require("./utils/upload");

const aboutSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
  },
  projects: {
    type: Number,
    required: true,
    min: 0,
  },
});

const About = mongoose.model("About", aboutSchema);

route.get("/", async (req, res) => {
  let about = await About.findOne();
  // if (!about) {
  // null
  // about = await About.create({
  //   image: "./imgs/download.png",
  //   title: ".. ",
  //   subTitle: "..",
  //   description: "..",
  //   experience: "0",
  //   projects: "0",
  // });
  // }
  res.status(200).json(about);
});

route.put("/", upload.single("image"), async (req, res) => {
  const { title, subTitle, description, experience, projects } = req.body;
  if (req.file) {
    updateData.image = req.file.filename;
  }
  const about = await About.findOneAndUpdate(
    {},
    {
      image: image,
      title: title,
      subTitle: subTitle,
      description: description,
      experience: experience,
      projects: projects,
    },
    { new: true, upsert: true },
  );
  res.status(200).json(about);
});
module.exports = route;
