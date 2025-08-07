const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

employeeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  return token;
};

const Employee = mongoose.model("Employee", employeeSchema);

const validateEmployee = (employee) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    employeeId: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(employee);
};

module.exports = { Employee, validateEmployee };
