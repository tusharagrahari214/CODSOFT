import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ViewIcon from "@material-ui/icons/ViewAgenda";
import ListAltIcon from "@material-ui/icons/ListAlt";
import BarChartIcon from "@material-ui/icons/BarChart";
import PeopleIcon from "@material-ui/icons/People";
import { Link as RouterLink } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import CreateProject from "./CreateProject";
import Sprint from "./Sprint";
import ViewProject from "./ViewProject";
import ProjectBacklog from "./ProjectBacklog";

const useStyles = makeStyles((theme) => ({
  section2: {
    marginLeft: "10%",
    marginTop: "0",
    height: "20%",
    width: "75%",
    textAlign: "center",
  },
  section3: {
    marginLeft: "10%",
    height: "70%",
    width: "75%",
    backgroundColor: "#DBFFF6",
  },
  root: {
    padding: theme.spacing(4),
  },
  shortcutButton: {
    backgroundColor: "#3bb19b",
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "#238d7a",
    },
    width: "100%",
    height: "auto",
    marginBottom: theme.spacing(2),
    fontSize: "1.5rem",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  shortcutIcon: {
    width: "40%",
    height: "40%",
    marginBottom: theme.spacing(1),
    display: "block",
    margin: "0 auto",
  },
  shortcutTitle: {
    fontWeight: "bold",
    display: "block",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isViewProjectOpen, setIsViewProjectOpen] = useState(false);
  const [isProjectBacklogOpen, setIsProjectBacklogOpen] = useState(false);

  const handleAddEmployeeOpen = () => {
    setIsAddEmployeeOpen(true);
  };

  const handleAddEmployeeClose = () => {
    setIsAddEmployeeOpen(false);
  };

  const handleCreateProjectOpen = () => {
    setIsCreateProjectOpen(true);
  };

  const handleCreateProjectClose = () => {
    setIsCreateProjectOpen(false);
  };

  const handleSprintOpen = () => {
    setIsSprintOpen(true);
  };

  const handleSprintClose = () => {
    setIsSprintOpen(false);
  };

  const handleViewProjectOpen = () => {
    setIsViewProjectOpen(true);
  };

  const handleViewProjectClose = () => {
    setIsViewProjectOpen(false);
  };

  const handleProjectBacklogOpen = () => {
    setIsProjectBacklogOpen(true);
  };

  const handleProjectBacklogClose = () => {
    setIsProjectBacklogOpen(false);
  };

  return (
    <div>
      <div className={classes.section1}></div>
      <div className={classes.section2}>
        <h3>Welcome to Project Management Tools</h3>
        <p>
          These features can help you manage your daily project tasks, backlogs,
          issues, and more.
        </p>
        <p>Easy to Track Project Progress Report</p>
      </div>
      <div className={classes.section3}>
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12} md={4}>
            <Tooltip title="Create a new project from scratch">
              <Button
                variant="contained"
                className={classes.shortcutButton}
                startIcon={<AddCircleIcon className={classes.shortcutIcon} />}
                onClick={handleCreateProjectOpen}
              >
                <span className={classes.shortcutTitle}>Create Project</span>
              </Button>
            </Tooltip>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              className={classes.shortcutButton}
              startIcon={<ViewIcon className={classes.shortcutIcon} />}
              onClick={handleViewProjectOpen}
            >
              <span className={classes.shortcutTitle}>View Project</span>
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              className={classes.shortcutButton}
              startIcon={<ListAltIcon className={classes.shortcutIcon} />}
              onClick={handleSprintOpen}
            >
              <span className={classes.shortcutTitle}>Add Sprint</span>
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              className={classes.shortcutButton}
              startIcon={<AddCircleIcon className={classes.shortcutIcon} />}
              onClick={handleProjectBacklogOpen}
            >
              <span className={classes.shortcutTitle}>Create Backlog</span>
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              className={classes.shortcutButton}
              startIcon={<PeopleIcon className={classes.shortcutIcon} />}
              onClick={handleAddEmployeeOpen}
            >
              <span className={classes.shortcutTitle}>Add Employee</span>
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              className={classes.shortcutButton}
              startIcon={<BarChartIcon className={classes.shortcutIcon} />}
              component={RouterLink}
              to="/project-progress-report"
            >
              <span className={classes.shortcutTitle}>Progress Report</span>
            </Button>
          </Grid>

          <AddEmployee
            open={isAddEmployeeOpen}
            handleClose={handleAddEmployeeClose}
          />
          <CreateProject
            open={isCreateProjectOpen}
            handleClose={handleCreateProjectClose}
          />
          <Sprint open={isSprintOpen} handleClose={handleSprintClose} />
          <ProjectBacklog
            open={isProjectBacklogOpen}
            handleClose={handleProjectBacklogClose}
          />
          <Dialog open={isViewProjectOpen} onClose={handleViewProjectClose}>
            <DialogTitle>View Project</DialogTitle>
            <DialogContent>
              <ViewProject />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleViewProjectClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
