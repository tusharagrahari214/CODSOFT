import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const ProjectBacklog = ({ open, onClose, projects, handleAddBacklog }) => {
  const classes = useStyles();
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [epic, setEpic] = useState("");
  const [storyPoints, setStoryPoints] = useState("");
  const [labels, setLabels] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleChange = (event) => {
    setSelectedProjectId(event.target.value);
  };

  const handleAddBacklogClick = () => {
    if (selectedProjectId && description && priority && assignee) {
      const backlogItem = {
        projectId: selectedProjectId,
        description,
        priority,
        epic,
        storyPoints,
        labels,
        assignee,
        dueDate,
      };
      handleAddBacklog(backlogItem);
      setSelectedProjectId("");
      setDescription("");
      setPriority("");
      setEpic("");
      setStoryPoints("");
      setLabels("");
      setAssignee("");
      setDueDate("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Backlog Item</DialogTitle>
      <DialogContent>
        <FormControl className={classes.formControl}>
          <InputLabel id="project-select-label">Select Project</InputLabel>
          <Select
            labelId="project-select-label"
            id="project-select"
            value={selectedProjectId}
            onChange={handleChange}
          >
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.projectName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className={classes.textField}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Epic"
          value={epic}
          onChange={(e) => setEpic(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Story Points"
          value={storyPoints}
          onChange={(e) => setStoryPoints(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Labels"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <TextField
          className={classes.textField}
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddBacklogClick} color="primary">
          Add Backlog
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectBacklog;
