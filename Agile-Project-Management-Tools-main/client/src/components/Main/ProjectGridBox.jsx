import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
} from "@material-ui/core";

const ProjectGridBox = ({ project, onViewDetails, onAddBacklog }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{project.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{project.description}</DialogContentText>
          <LinearProgress variant="determinate" value={project.progress} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onViewDetails(project.id)} color="primary">
            View Details
          </Button>
          <Button onClick={() => onAddBacklog(project.id)} color="primary">
            Add Backlog
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={handleOpenDialog}>{project.name}</Button>
    </Grid>
  );
};

export default ProjectGridBox;
