import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Main/Dashboard";
import CreateProject from "./components/Main/CreateProject";
import AddEmployee from "./components/Main/AddEmployee";
import Sprint from "./components/Main/Sprint";
import ViewProject from "./components/Main/ViewProject";
import ProjectBacklog from "./components/Main/ProjectBacklog";
import Home from "./components/Home";
import EmployeeLogin from "./components/Login/EmployeeLogin";
import EmpDashboard from "./components/Employee/EmployeeDashboard";
import ScrumBoard from "./components/Main/ScrumBoard/ScrumBoard";

function App() {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isViewProjectOpen, setIsViewProjectOpen] = useState(false);
  const [isProjectBacklogOpen, setIsProjectBacklogOpen] = useState(false);
  const [isScrumBoardOpen, setIsScrumBoardOpen] = useState(false);


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
 const handleScrumBoardOpen = () => {
    setIsScrumBoardOpen(true);
  };

  const handleScrumBoardClose = () => {
    setIsScrumBoardOpen(false);
  };


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/employee-dashboard" element={<EmpDashboard />} />
      <Route path="/scrum-board" element={<ScrumBoard />} />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            handleAddEmployeeOpen={handleAddEmployeeOpen}
            handleCreateProjectOpen={handleCreateProjectOpen}
            handleSprintOpen={handleSprintOpen}
            handleViewProjectOpen={handleViewProjectOpen}
            handleScrumBoardOpen={handleScrumBoardOpen}
            handleProjectBacklogOpen={handleProjectBacklogOpen}
          />
        }
      />
      <Route
        path="/add-employee"
        element={
          <AddEmployee
            open={isAddEmployeeOpen}
            handleClose={handleAddEmployeeClose}
          />
        }
      />
      <Route
        path="/create-project"
        element={
          <CreateProject
            open={isCreateProjectOpen}
            handleClose={handleCreateProjectClose}
          />
        }
      />
      <Route
        path="/add-sprint"
        element={
          <Sprint
            open={isSprintOpen}
            handleClose={handleSprintClose}
          />
        }
      />
      <Route
        path="/project-backlog"
        element={
          <ProjectBacklog
            open={isProjectBacklogOpen}
            handleClose={handleProjectBacklogClose}
          />
        }
      />
      <Route
        path="/view-project"
        element={
          <ViewProject
            open={isViewProjectOpen}
            handleClose={handleViewProjectClose}
          />
        }
      />

      <Route
        path="/scrum-board"
        element={
          <ScrumBoard
            open={isScrumBoardOpen}
            handleClose={handleScrumBoardClose}
          />
        }
      />
    </Routes>
    
    
  );
}

export default App;
