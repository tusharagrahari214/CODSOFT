const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// POST request to create a new task
router.post('/', async (req, res) => {
  const { projectName, title, employees, priority, endDate, status } = req.body;

  // Validation checks
  if (!projectName || !title || !employees.length || !priority || !endDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newTask = new Task({
      projectName,
      title,
      employees,
      priority,
      endDate,
      status,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// GET request to fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// PUT request to update task status
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Failed to update task status' });
  }
});

module.exports = router;
