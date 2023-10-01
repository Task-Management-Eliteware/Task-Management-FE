/* eslint-disable no-underscore-dangle */
import React, { FC } from 'react';
import { TUpdate, useDeleteTask, useGetTasksList, useUpdateTask } from 'shared';

type TTaskListProps = {
  onSetUpdateValue: (value: TUpdate) => void;
};

const TaskList: FC<TTaskListProps> = (props) => {
  const { onSetUpdateValue } = props;
  const { data } = useGetTasksList();
  const [deleteTask] = useDeleteTask();

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId)
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleUpdateTask = (task: TUpdate) => {
    onSetUpdateValue(task);
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
                <button className="btn btn-warning btn-sm mx-2" onClick={() => handleUpdateTask(el)}>
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
