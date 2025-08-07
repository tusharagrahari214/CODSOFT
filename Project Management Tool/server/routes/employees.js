const express = require('express');
const router = express.Router();
const { Employee, validateEmployee } = require('../models/employee');
const Task = require('../models/Task');
const Sprint = require('../models/Sprint');
const authenticate = require('../middleware/authMiddleware');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const employee = new Employee({
    name: req.body.name,
    employeeId: req.body.employeeId,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Get profile of the logged-in employee
router.get('/profile', authenticate, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user._id).select('-password');
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Get tasks assigned to the logged-in employee
router.get('/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.user._id }).populate('assignee').populate('sprint');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get tasks assigned to the logged-in employee
router.get('/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.user._id }).populate('assignee').populate('sprint');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task status
router.put('/tasks/:id/status', authenticate, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = req.body.status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Existing routes remain unchanged

// Get all sprints
router.get('/sprints', async (req, res) => {
  try {
    const sprints = await Sprint.find();
    res.json(sprints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new sprint
router.post('/sprints', async (req, res) => {
  const sprint = new Sprint({
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    totalEstimation: req.body.totalEstimation,
    projects: req.body.projects,
    employees: req.body.employees
  });

  try {
    const newSprint = await sprint.save();
    res.status(201).json(newSprint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
