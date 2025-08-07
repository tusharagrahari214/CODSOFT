const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  projectName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  }],
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
