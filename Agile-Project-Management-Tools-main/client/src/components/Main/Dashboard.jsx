import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  CssBaseline,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import CreateProject from "./CreateProject";
import AddEmployee from "./AddEmployee";
import ViewProject from "./ViewProject";
import ScrumBoard from "./ScrumBoard/ScrumBoard";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "linear-gradient(180deg, #3bb19b, #238c79)",
    color: "#fff",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  toolbar: theme.mixins.toolbar,
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "linear-gradient(180deg, #3bb19b, #238c79)",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  welcome: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridItem: {
    padding: theme.spacing(2),
  },
  card: {
    background: "linear-gradient(180deg, #3bb19b, #238c79)",
    borderRadius: "8px",
    color: "#fff",
    textAlign: "center",
    padding: theme.spacing(4),
    boxShadow: theme.shadows[3],
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isViewProjectOpen, setIsViewProjectOpen] = useState(false);
  const [isScrumBoardDialogOpen, setIsScrumBoardDialogOpen] = useState(false);

  const handleCreateProjectOpen = () => {
    setIsCreateProjectOpen(true);
  };

  const handleCreateProjectClose = () => {
    setIsCreateProjectOpen(false);
  };

  const handleAddEmployeeOpen = () => {
    setIsAddEmployeeOpen(true);
  };

  const handleAddEmployeeClose = () => {
    setIsAddEmployeeOpen(false);
  };

  const handleViewProjectOpen = () => {
    setIsViewProjectOpen(true);
  };

  const handleViewProjectClose = () => {
    setIsViewProjectOpen(false);
  };

  const handleScrumBoardOpen = () => {
    setIsScrumBoardDialogOpen(true);
  };

  const handleScrumBoardClose = () => {
    setIsScrumBoardDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Project Management Tools
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={handleCreateProjectOpen}>
              <ListItemIcon>
                <ShoppingCartIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Create Project" />
            </ListItem>
            <ListItem button onClick={handleAddEmployeeOpen}>
              <ListItemIcon>
                <PeopleIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Add Employee" />
            </ListItem>
            <ListItem button onClick={handleViewProjectOpen}>
              <ListItemIcon>
                <ListAltIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="View Project" />
            </ListItem>
            <ListItem button onClick={handleScrumBoardOpen}>
              <ListItemIcon>
                <ListAltIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Scrum Board" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.welcome}>
          <Typography variant="h4">
            Welcome back,
            <br />
            {""}
            <p>Here You can manage your project & track Project Status.</p>
          </Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <div className={classes.card}>
              <Typography variant="h5">Projects</Typography>
              <Typography variant="h4">5</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <div className={classes.card}>
              <Typography variant="h5">Employee</Typography>
              <Typography variant="h4">5</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <div className={classes.card}>
              <Typography variant="h5">Reports</Typography>
              <Typography variant="h4">5</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <div className={classes.card}>
              <Typography variant="Milestone">Add Milestone</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <div className={classes.card}>
              <Typography variant="UserStory">Add UserStory</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <div className={classes.card}>
              <Typography variant="epic">Add Milestone</Typography>
            </div>
          </Grid>
        </Grid>
      </main>

      <CreateProject
        open={isCreateProjectOpen}
        handleClose={handleCreateProjectClose}
      />
      <AddEmployee
        open={isAddEmployeeOpen}
        handleClose={handleAddEmployeeClose}
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
      <Dialog
        open={isScrumBoardDialogOpen}
        onClose={handleScrumBoardClose}
        aria-labelledby="scrum-board-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="scrum-board-dialog-title">Scrum Board</DialogTitle>
        <DialogContent>
          <ScrumBoard />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScrumBoardClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
