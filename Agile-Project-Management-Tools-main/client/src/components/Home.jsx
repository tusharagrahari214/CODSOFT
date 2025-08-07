import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// Import images from the src directory
import headImage from "../Assets/head.jpg";
import projectCreationImage from "../Assets/project.jpeg";
import assignedEmployeesImage from "../Assets/employee.jpeg";
import projectReportsImage from "../Assets/report.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#3bb19b",
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bannerImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    marginTop: theme.spacing(2),
  },
  gridImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginTop: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Project Management Tools
          </Typography>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/signup" color="inherit">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Paper className={classes.paper}>
          <Typography variant="h4">
            Welcome to Project Management Tools
          </Typography>
          <img src={headImage} alt="Head" className={classes.bannerImage} />
          <Typography variant="body1">
            A Complete Project Management Solutions For Businesses Of All Sizes.
          </Typography>
        </Paper>
        <Grid container spacing={3} style={{ marginTop: "16px" }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Project Creation</Typography>
              <img
                src={projectCreationImage}
                alt="Project Creation"
                className={classes.gridImage}
              />
              <Typography variant="body2">
                You can create a project with easy steps
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Assigned Employees</Typography>
              <img
                src={assignedEmployeesImage}
                alt="Assigned Employees"
                className={classes.gridImage}
              />
              <Typography variant="body2">
                Assign employee for different tasks
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Project Reports</Typography>
              <img
                src={projectReportsImage}
                alt="Project Reports"
                className={classes.gridImage}
              />
              <Typography variant="body2">
                Track your project work progress report.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
