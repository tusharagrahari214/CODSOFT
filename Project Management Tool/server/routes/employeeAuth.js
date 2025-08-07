const express = require('express');
const router = express.Router();
const { Employee } = require('../models/employee');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// Login validation middleware
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

// Route for employee login
router.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, employee.password);

    if (!validPassword) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).send({ data: token, message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
