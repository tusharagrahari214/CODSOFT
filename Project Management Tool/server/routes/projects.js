const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Create a new project
router.post('/', async (req, res) => {
  try {
    const { projectName, createdDate, selectedEmployee, description } = req.body;
    const project = new Project({
      projectName,
      createdDate,
      selectedEmployee,
      description,
    });
    await project.save();
    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
});

// Route to fetch project names for Add Sprint component
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({}, "projectName");
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route to fetch projects by employee ID
router.get("/employee/:id", async (req, res) => {
  try {
    const projects = await Project.find({ selectedEmployee: req.params.id });
    if (!projects.length) {
      return res.status(404).json({ message: 'No projects found for this employee' });
    }
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Route to fetch a single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Failed to fetch project" });
  }
});

module.exports = router;
