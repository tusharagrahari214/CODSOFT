const express = require('express');
const router = express.Router();
const Sprint = require('../models/Sprint');

router.post('/', async (req, res) => {
  try {
    const { projects, employees, name, startDate, endDate, totalEstimation } = req.body;
    if (!projects || !employees) {
      return res.status(400).json({ message: 'Projects and employees are required' });
    }
    if (isNaN(totalEstimation)) {
      return res.status(400).json({ message: 'Total estimation must be a number' });
    }
    const newSprint = new Sprint({ projects, employees, name, startDate, endDate, totalEstimation });
    await newSprint.save();
    res.status(201).json({ message: 'Sprint created successfully' });
  } catch (error) {
    console.error('Error creating sprint:', error);
    res.status(500).json({ message: 'Failed to create sprint' });
  }
});

module.exports = router;
