import express from "express";
import Project from "../models/Project.js"; // Adjust path as needed
import User from "../models/User.js";

const router = express.Router();

// Create a new project
router.post("/", async (req, res) => {
  try {
    const { name, description, collaborators, members } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = new Project({ name, description, collaborators, members });
    await project.save();

    res.status(201).json(project);
   
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get all projects
router.get("/fetchprojects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Get a single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Update a project by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, description, collaborators, members } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, collaborators, members },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Delete a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// to  gete the all  teh user

export default router;
