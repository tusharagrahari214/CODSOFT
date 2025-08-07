const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

// Profile route
router.get("/", async (req, res) => {
  try {
    // Assume you have a middleware to get the employee ID from the token
    const employeeId = req.employeeId;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
