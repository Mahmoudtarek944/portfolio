const express = require("express");
const mongoose = require("mongoose");

const route = express.Router();

const formSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true },
);

const Form = mongoose.model("Form", formSchema);

route.get("/", async (req, res) => {
  const form = await Form.find({}, {});

  res.status(200).json(form);
});

route.get("/latest-messages", async (req, res) => {
  const latestMessage = await Form.find().sort({ createdAt: -1 }).limit(3);
  res.status(200).json(latestMessage);
});

route.post("/", async (req, res) => {
  const { name, email, subject, message, date } = req.body;
  const form = await Form.create({ name, email, subject, message, date });
  res.status(201).json(form);
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const formDeleted = await Form.findByIdAndDelete(id);
  res.status(200).json(formDeleted);
});
module.exports = route;
