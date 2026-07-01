const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();

// [
//     {
//         "category" : "Frontend" ,
//         "skills" : [
//             {   "skill" : "Responsive" ,
//                 "percentage" : 90
//             }
//         ]
//     }
// ]
const singleSkillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});
const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  skills: {
    type: [singleSkillSchema],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

route.get("/", async (req, res) => {
  const numberSkills = await Skill.countDocuments();
  let mySkills;
  if (numberSkills === 0) {
    const defaultSkill = await Skill.create({
      category: "..",
      skills: [],
      isDeleted: true,
    });
    mySkills = [defaultSkill];
  } else {
    mySkills = await Skill.find({ isDeleted: false }, {});
  }
  res.status(200).json(mySkills);
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({
        message: "Error Not Found 404",
      });
    }
    res.status(200).json(skill);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "ID format is uncorrect",
      });
    }
  }
});

// route.post("/", async (req, res) => {
//   const { category, skills } = req.body;
//   const skill = await Skill.create({
//     category: category,
//     skills: skills,
//   });
//   res.status(201).json(skill);
// });

route.post("/", async (req, res) => {
  const { category, skills } = req.body;

  let existingCategory = await Skill.findOne({ category: category });

  if (existingCategory) {
    const updatedCategory = await Skill.findOneAndUpdate(
      { category: category },
      { $push: { skills: { $each: skills } } },
      { new: true },
    );

    return res.status(200).json(updatedCategory);
  } else {
    const newCategory = await Skill.create({
      category: category,
      skills: skills,
      isDeleted: false,
    });
    return res.status(201).json(newCategory);
  }
});
// PUT: /api/skills
route.put("/", async (req, res) => {
  const { category, skillName, percentage } = req.body;

  try {
    const updatedSkill = await Skill.findOneAndUpdate(
      { category: category },
      {
        $push: { skills: { skillName, percentage } },
      },
      {
        new: true,
        upsert: true,
      },
    );
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: "Server Error ", error });
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { category, skills, isDeleted } = req.body;
  try {
    const mySkill = await Skill.findByIdAndUpdate(
      id,
      { category, skills, isDeleted },
      { new: true },
    );
    if (!mySkill) {
      return res.status(404).json({
        message: "Error Not Found 404",
      });
    }
    res.status(200).json(mySkill);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "ID format is uncorrect",
      });
    }
  }
});

route.delete("/:id/subskill/:index", async (req, res) => {
  try {
    const { id, index } = req.params;

    const skillCategory = await Skill.findById(id);
    if (!skillCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    skillCategory.skills.splice(Number(index), 1);
    if (skillCategory.skills.length === 0) {
      await Skill.findByIdAndDelete(id);
      return res.status(200).json({ deleted: true, _id: id, skills: [] });
    }
    await skillCategory.save();
    res.status(200).json(skillCategory);
  } catch (error) {
    res.status(500).json({ error: "ID Not Format" });
  }
});

route.put("/:id/subskill/:index", async (req, res) => {
  try {
    const { id, index } = req.params;
    const { skillName, percentage } = req.body;

    const skillCategory = await Skill.findById(id);
    if (!skillCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (skillName) skillCategory.skills[index].skillName = skillName;
    if (percentage !== undefined)
      skillCategory.skills[index].percentage = Number(percentage);
    await skillCategory.save();

    res.status(200).json(skillCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = route;
