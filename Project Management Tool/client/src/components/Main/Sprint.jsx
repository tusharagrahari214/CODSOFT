import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const Sprint = ({ open, onClose }) => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [sprintName, setSprintName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalEstimation, setTotalEstimation] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchProjects();
    fetchEmployees();
  }, []);

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployees(event.target.value);
  };

  const handleSprintNameChange = (event) => {
    setSprintName(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleTotalEstimationChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setTotalEstimation(value);
    }
  };

  const handleSprint = async () => {
    const sprintData = {
      projects: selectedProject,
      employees: selectedEmployees,
      name: sprintName,
      startDate,
      endDate,
      totalEstimation,
    };

    console.log("Sprint Data:", sprintData); // Log the data to verify

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sprints",
        sprintData
      );
      if (response.status === 201) {
        console.log("Sprint added successfully");
        onClose();
      } else {
        console.error("Failed to add Sprint");
      }
    } catch (error) {
      console.error("Error adding sprint:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Project Sprints</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select a project to view details and manage tasks.
        </DialogContentText>
        <FormControl fullWidth margin="dense">
          <InputLabel id="project-select-label">Select Project</InputLabel>
          <Select
            labelId="project-select-label"
            id="project-select"
            value={selectedProject}
            onChange={handleProjectChange}
          >
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.projectName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="assigned-employee-select-label">
            Assigned Employees
          </InputLabel>
          <Select
            labelId="assigned-employee-select-label"
            id="assigned-employee-select"
            value={selectedEmployees}
            onChange={handleEmployeeChange}
            multiple
          >
            {employees.map((employee) => (
              <MenuItem key={employee._id} value={employee._id}>
                {employee.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Sprint Name"
          type="text"
          fullWidth
          value={sprintName}
          onChange={handleSprintNameChange}
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={handleStartDateChange}
        />
        <TextField
          margin="dense"
          label="End Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={handleEndDateChange}
        />
        <TextField
          margin="dense"
          label="Total Estimation"
          type="text"
          fullWidth
          value={totalEstimation}
          onChange={handleTotalEstimationChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSprint} color="primary">
          Add Sprint
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Sprint;
