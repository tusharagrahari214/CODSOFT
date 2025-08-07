import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  makeStyles,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import axios from "axios";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Sprint from "./Sprint";
import ProjectBacklog from "./ProjectBacklog";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    position: "relative",
  },
  projectButton: {
    background: "linear-gradient(180deg, #4cc1a3, #2ba487)",
    color: "#fff",
    margin: "5px",
    padding: "10px",
    width: "100%",
    textAlign: "left",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "&:hover": {
      background: "linear-gradient(180deg, #45b898, #279f78)",
    },
  },
  addButton: {
    margin: theme.spacing(1),
    background: "linear-gradient(180deg, #4cc1a3, #2ba487)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(180deg, #45b898, #279f78)",
    },
  },
  dialogTitle: {
    background: "linear-gradient(180deg, #4cc1a3, #2ba487)",
    color: "#fff",
    padding: theme.spacing(2),
  },
  dialogContent: {
    background: "#f5f5f5",
    padding: theme.spacing(2),
  },
  dialogActions: {
    background: "#f5f5f5",
    padding: theme.spacing(1),
  },
  closeButton: {
    background: "linear-gradient(180deg, #4cc1a3, #2ba487)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(180deg, #45b898, #279f78)",
    },
  },
}));

const ViewProject = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isAddSprintOpen, setIsAddSprintOpen] = useState(false);
  const [isAddBacklogOpen, setIsAddBacklogOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects/");
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const handleViewDetails = async (projectId) => {
    if (!projectId) {
      console.error("Project ID is missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/projects/${projectId}`
      );
      setSelectedProject(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Failed to fetch project details:", error);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSprint = () => {
    setIsAddSprintOpen(true);
  };

  const handleAddBacklog = () => {
    setIsAddBacklogOpen(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">Project Management Tools</Typography>
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            className={classes.addButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddSprint}
          >
            Add Sprint
          </Button>
          <Button
            variant="outlined"
            className={classes.addButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddBacklog}
          >
            Add Backlog
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Box height="100%">
              <Button
                className={classes.projectButton}
                onClick={() => handleViewDetails(project._id)}
              >
                {project.projectName}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.dialogTitle}>
          {selectedProject ? selectedProject.projectName : ""}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {loading ? (
            <LinearProgress />
          ) : (
            <>
              <DialogContentText>
                {selectedProject
                  ? `Progress: ${selectedProject.progress}%`
                  : ""}
              </DialogContentText>
              <DialogContentText>
                {selectedProject
                  ? `Created Date: ${selectedProject.createdDate}`
                  : ""}
              </DialogContentText>
              <DialogContentText>
                {selectedProject
                  ? `Selected Employee: ${selectedProject.selectedEmployee}`
                  : ""}
              </DialogContentText>
              <DialogContentText>
                {selectedProject
                  ? `Description: ${selectedProject.description}`
                  : ""}
              </DialogContentText>
            </>
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleClose} className={classes.closeButton}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isAddSprintOpen} onClose={() => setIsAddSprintOpen(false)}>
        <DialogTitle className={classes.dialogTitle}>Add Sprint</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Sprint
            open={isAddSprintOpen}
            onClose={() => setIsAddSprintOpen(false)}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={() => setIsAddSprintOpen(false)}
            className={classes.closeButton}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isAddBacklogOpen}
        onClose={() => setIsAddBacklogOpen(false)}
      >
        <DialogTitle className={classes.dialogTitle}>Add Backlog</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <ProjectBacklog
            open={isAddBacklogOpen}
            onClose={() => setIsAddBacklogOpen(false)}
            projects={projects}
            handleAddBacklog={(backlogItem) => {
              // Handle adding backlog item here
              console.log(backlogItem);
              setIsAddBacklogOpen(false);
            }}
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={() => setIsAddBacklogOpen(false)}
            className={classes.closeButton}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewProject;
