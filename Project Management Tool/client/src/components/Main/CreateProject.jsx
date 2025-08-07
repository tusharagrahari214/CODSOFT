import React, { useState, useEffect, useRef } from "react";
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

const CreateProject = ({ open, handleClose }) => {
  const [projectName, setProjectName] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [description, setDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const dialogRef = useRef(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          createdDate,
          selectedEmployee,
          description,
        }),
      });
      if (response.ok) {
        console.log("Project created successfully");
        handleClose();
      } else {
        console.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
    // Reset form fields
    setProjectName("");
    setCreatedDate("");
    setSelectedEmployee("");
    setDescription("");
    // Close the dialog using the ref
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <Dialog open={open} onClose={handleClose} ref={dialogRef}>
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details to create a new project.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Project Name"
          type="text"
          fullWidth
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Created Date"
          type="date"
          fullWidth
          value={createdDate}
          onChange={(e) => setCreatedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="assigned-employee-select-label">
            Assigned Employee
          </InputLabel>
          <Select
            labelId="assigned-employee-select-label"
            id="assigned-employee-select"
            value={selectedEmployee}
            onChange={handleEmployeeChange}
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
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProject;
