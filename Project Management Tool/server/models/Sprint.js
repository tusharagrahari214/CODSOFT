const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalEstimation: {
    type: Number,
    required: true
  },
  projects: [{
    type: String,
    required: true
  }],
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }]
});

const Sprint = mongoose.models.Sprint || mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;
