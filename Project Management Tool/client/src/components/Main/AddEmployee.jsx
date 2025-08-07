import React, { useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const AddEmployee = ({ open, handleClose }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [password, setPassword] = useState("");
  const dialogRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: employeeName,
          employeeId,
          email: employeeEmail,
          password,
        }),
      });
      if (response.ok) {
        console.log("Employee added successfully");
        handleClose();
      } else {
        console.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
    // Reset form fields
    setEmployeeName("");
    setEmployeeId("");
    setEmployeeEmail("");
    setPassword("");
    // Close the dialog using the ref
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the details of the new employee.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Employee Name"
          type="text"
          fullWidth
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Employee ID"
          type="text"
          fullWidth
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Employee Email"
          type="email"
          fullWidth
          value={employeeEmail}
          onChange={(e) => setEmployeeEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployee;
