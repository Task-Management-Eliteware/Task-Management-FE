import React, { useState } from 'react';
import { TUpdate } from 'shared';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Task = () => {
  const [taskValue, setTaskValue] = useState<TUpdate | undefined>(undefined);
  return (
    <div className="mt-2">
      <TaskForm task={taskValue} />
      <TaskList onSetUpdateValue={setTaskValue} />
    </div>
  );
};

export default Task;
