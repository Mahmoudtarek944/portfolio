const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();

const contectSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", contectSchema);

route.get("/", async (req, res) => {
  let contact = await Contact.findOne(); // document or null
  if (!contact) {
    contact = await Contact.create({
      email: "test@gmail.com",
      location: "...",
      availability: "...",
    });
  }
  res.status(200).json(contact);
});

route.put("/", async (req, res) => {
  const { email, location, availability } = req.body;
  const contact = await Contact.findOneAndUpdate(
    {},
    { email, location, availability },
    { new: true },
  );
  res.status(200).json(contact);
});

// to get the post route in the same route '/contact'
// const form = require("./form");

module.exports = route;
