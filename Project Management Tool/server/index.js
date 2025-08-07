require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const projectRoutes = require("./routes/projects");
const employeeRoutes = require("./routes/employees"); // General employee operations
const authRoutes = require("./routes/auth"); // User authentication
const employeeAuthRoutes = require("./routes/employeeAuth"); // Employee authentication
const sprintRoutes = require("./routes/sprints");
const taskRoutes = require('./routes/tasks');
const profileRoutes = require("./routes/profile");

// Create express app
const app = express();

// Connect to MongoDB
connection();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/employees", employeeRoutes); // General employee operations
app.use("/api/auth", authRoutes); // User authentication
app.use("/api/employeeAuth", employeeAuthRoutes); // Employee authentication
app.use("/api/sprints", sprintRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
