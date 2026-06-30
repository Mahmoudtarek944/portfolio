const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/portfolio").then(() => {
  console.log("DB Connected Successfuly");
});

app.use(express.json());

app.use("/upload", express.static("upload"));

app.use(cors()); // can frontend get APIs

const homeRouter = require("./home");
app.use("/", homeRouter);

const aboutRouter = require("./about");
app.use("/about", aboutRouter);

const projectsRouter = require("./projects");
app.use("/project", projectsRouter);

const servicesRouter = require("./services");
app.use("/service", servicesRouter);

const skillRouter = require("./skills");
app.use("/skill", skillRouter);

const contectRouter = require("./contact");
app.use("/contact", contectRouter);

const formRouter = require("./form");
app.use("/contact", formRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Error Not Found 404",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running at PORT ${PORT}`);
});
