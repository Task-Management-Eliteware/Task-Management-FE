/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect, useMemo, useState } from 'react';
import { TUpdate, useDeleteTask, useGetTasksList } from 'shared';
import { useImmer } from 'use-immer';
import { Dropdown } from 'components/common/Dropdown';
import { MenuItemType } from 'components/common/models';

type TTaskListProps = {
  onSetUpdateValue: (value: TUpdate) => void;
  categoriesOptions: MenuItemType[];
};

const TaskList: FC<TTaskListProps> = (props) => {
  const { onSetUpdateValue, categoriesOptions } = props;
  const [categories, setCategories] = useState<MenuItemType[]>([]);
  const [filter, setFilter] = useImmer({
    categories: [] as string[],
  });

  useEffect(() => {
    if (categoriesOptions.length > 0) {
      setCategories([...categoriesOptions]);
    }
  }, [categoriesOptions]);

  const { data: taskList } = useGetTasksList({ taskCategoryIds: JSON.stringify(filter.categories) });

  const [deleteTask] = useDeleteTask();

  const handleSelectCategory = (e: any) => {
    setFilter((draft) => {
      draft.categories = [...e.target.value];
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTask = (task: TUpdate) => {
    const { _id, taskTitle, taskCategoryId, taskDescription, taskPriorities } = task;
    onSetUpdateValue({ _id, taskTitle, taskCategoryId, taskDescription, taskPriorities });
  };

  return (
    <div className="mt-2">
      <h1>Table</h1>
      <div className="filter">
        <Dropdown
          label="Category"
          type="multiple"
          limitTag={3}
          menuItems={categories}
          onChange={handleSelectCategory}
          sx={{ m: 1, minWidth: 250 }}
          value={filter.categories}
        />
      </div>
      <div className="card">
        <div className="card-body">
          {taskList?.result?.data.map((el) => (
            <li className="m-2 d-flex" key={el._id}>
              <p className="mx-3"> {el.taskTitle}</p>
              <p className="mx-3"> {el.tasksCategory.categoryType}</p>
              <p className="mx-3"> {el.taskDescription}</p>
              <p className="mx-3"> {el.taskPriorities}</p>

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
