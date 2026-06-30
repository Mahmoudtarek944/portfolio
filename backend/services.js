const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  icon: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Service = mongoose.model("Service", serviceSchema);

route.get("/", async (req, res) => {
  const numberService = await Service.countDocuments();
  let service;
  if (numberService === 0) {
    let defaultService = await Service.create({
      icon: "..",
      title: "..",
      description: "..",
      isDeleted: true,
    });
    service = [defaultService];
  } else {
    service = await Service.find({ isDeleted: false }, {});
  }

  res.status(200).json(service);
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findById(id); // if exist -> object , else -> null
    if (!service) {
      return res.status(404).json({
        message: "Error Not Found 404",
      });
    }
    res.status(200).json(service);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "ID format is uncorrect",
      });
    }
  }
});

route.post("/", async (req, res) => {
  const { icon, title, description } = req.body;
  const service = await Service.create({
    icon: icon,
    title: title,
    description: description,
    isDeleted: false,
  });
  res.status(201).json(service);
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { icon, title, description, isDeleted } = req.body;
  const service = await Service.findByIdAndUpdate(
    id,
    { icon, title, description, isDeleted },
    { new: true },
  );
  res.status(200).json(service);
});

module.exports = route;
