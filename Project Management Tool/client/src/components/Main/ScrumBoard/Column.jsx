// Column.jsx
import React from "react";
import Task from "./Task";

const Column = ({ title, tasks, moveTask }) => {
  const handleDrop = (event) => {
    const taskId = event.dataTransfer.getData("taskId");
    moveTask(taskId, title);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <div className="column" onDrop={handleDrop} onDragOver={allowDrop}>
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={(event) => event.dataTransfer.setData("taskId", task.id)}
        >
          <Task task={task} moveTask={moveTask} />
        </div>
      ))}
    </div>
  );
};

export default Column;
