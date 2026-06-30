const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const upload = require("./utils/upload");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    // unique: true,
  },
  dimoLink: {
    type: String,
    // unique: true,
  },
  image: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Project = mongoose.model("Project", projectSchema);

route.get("/", async (req, res) => {
  const numberProjectDocument = await Project.countDocuments();
  let project;

  if (numberProjectDocument === 0) {
    // empty colection -> create a defualt document
    let defaultProject = await Project.create({
      title: "..",
      category: "..",
      description: "..",
      githubLink: " ..",
      dimoLink: " ..",
      // image: "",
      isDeleted: true,
    });
    project = [defaultProject];
  } else {
    project = await Project.find({ isDeleted: false }, {}); // not add projection _id : 0 , I need in front
  }
  // if we have documents -> project is an array of documents , if not it is an object 'defualt object';
  res.status(200).json(project);
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id); // return the document or null
    if (!project) {
      return res.status(404).json({
        message: "Error Not Found 404",
      });
    }
    res.status(200).json(project);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "ID format is uncorrect",
      });
    }
  }
});

route.post("/", async (req, res) => {
  try {
    const { title, category, description, githubLink, dimoLink } = req.body;

    const project = await Project.create({
      title,
      category,
      description,
      githubLink,
      dimoLink,
      isDeleted: false,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, githubLink, dimoLink, isDeleted } =
      req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      { title, category, description, githubLink, dimoLink, isDeleted },
      { new: true },
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProject = await Project.findByIdAndDelete(id);
  res.status(200).json(deleteProject);
});
module.exports = route;
