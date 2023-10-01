/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useDeleteTask, useGetTasksList, useUpdateTask } from 'shared';

const TaskList = () => {
  const { data } = useGetTasksList();
  const [deleteTask] = useDeleteTask();
  const [updateTask] = useUpdateTask();

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId)
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleUpdateTask = (taskId: string) => {
    deleteTask(taskId)
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-2">
      <div className="card">
        <div className="card-body">
          {data?.result?.data.map((el) => (
            <li className="m-2 d-flex">
              {el.taskTitle}
              <div className="d-flex">
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleDeleteTask(el._id)}>
                  delete
                </button>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleDeleteTask(el._id)}>
                  Update
                </button>
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
