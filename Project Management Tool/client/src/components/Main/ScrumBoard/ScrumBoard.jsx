import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ScrumBoard.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const ScrumBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [isScrumBoardFullScreen, setIsScrumBoardFullScreen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    priority: "",
    status: "To Do",
  });

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

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const moveTaskToInProgress = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        status: "In Progress",
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to move task to In Progress:", error);
    }
  };

  const moveTaskToDone = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        status: "Done",
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to move task to Done:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployees(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleScrumBoardOpen = () => {
    setIsScrumBoardFullScreen(true);
  };

  const handleScrumBoardClose = () => {
    setIsScrumBoardFullScreen(false);
  };

  const handleNewTaskChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleAddTask = async () => {
    const taskData = {
      projectName: selectedProject,
      title: newTask.title,
      employees: selectedEmployees,
      priority: newTask.priority,
      endDate,
      status: newTask.status,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        taskData
      );
      if (response.status === 201) {
        console.log("Task added successfully:", response.data);
        setTasks([...tasks, response.data.task]); // Update tasks state
        fetchTasks(); // Refresh the tasks list
        handleScrumBoardClose(); // Close the dialog
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const renderColumn = (status) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    return (
      <div className="column">
        <h3 className="column-title">{status}</h3>
        {filteredTasks.map((task) => (
          <div key={task._id} className="task">
            <div className="task-title">{task.title}</div>
            <div className="task-details">
              <div>Project: {task.projectName}</div>
              <div>Priority: {task.priority}</div>
              <div>End Date: {task.endDate}</div>
            </div>
            <div className="task-actions">
              {status === "To Do" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => moveTaskToInProgress(task._id)}
                >
                  In Progress
                </Button>
              )}
              {status === "In Progress" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => moveTaskToDone(task._id)}
                >
                  Done
                </Button>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="scrum-board">
        {renderColumn("To Do")}
        {renderColumn("In Progress")}
        {renderColumn("Done")}
        <div>
          <Button onClick={handleScrumBoardOpen}>Add Task</Button>
        </div>
      </div>

      <Dialog
        fullScreen
        open={isScrumBoardFullScreen}
        onClose={handleScrumBoardClose}
      >
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <div className="form-container">
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
            <TextField
              label="Title"
              name="title"
              value={newTask.title}
              onChange={handleNewTaskChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="assigned-employee-select-label">
                Assigned To
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={newTask.priority}
                onChange={handleNewTaskChange}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTask} color="primary">
            Add Task
          </Button>
          <Button onClick={handleScrumBoardClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ScrumBoard;
