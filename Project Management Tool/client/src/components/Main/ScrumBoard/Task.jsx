// Task.jsx
import React from "react";
import { Button } from "@material-ui/core";

const Task = ({ task, moveTask }) => {
  const handleMoveToInProgress = () => {
    moveTask(task.id, "In Progress");
  };

  const handleMoveToDone = () => {
    moveTask(task.id, "Done");
  };

  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.priority}</p>
      <div>
        <Button onClick={handleMoveToInProgress}>Move to In Progress</Button>
        <Button onClick={handleMoveToDone}>Move to Done</Button>
      </div>
    </div>
  );
};

export default Task;
