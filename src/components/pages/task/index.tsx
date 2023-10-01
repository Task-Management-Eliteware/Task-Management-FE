import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Task = () => {
  return (
    <div className="mt-2">
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Task;
