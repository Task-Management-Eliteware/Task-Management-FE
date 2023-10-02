import React, { useState } from 'react';
import { TListReturn, TTaskUpsert, useGetCategoriesList } from 'shared';
import { MenuItemType } from 'components/common/models';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const createMenuList = (categories: TListReturn['result']['data']): MenuItemType[] => {
  return categories.map((el) => ({ itemLabel: el.categoryType, itemValue: el._id }));
};

const Task = () => {
  const [taskValue, setTaskValue] = useState<TTaskUpsert | undefined>(undefined);
  const { data: categoriesList } = useGetCategoriesList();

  const categoriesOptions = (categoriesList && createMenuList(categoriesList?.result.data)) || [];
  return (
    <div className="mt-2">
      <TaskForm task={taskValue} onSetUpdateValue={setTaskValue} categoriesOptions={categoriesOptions} />
      <TaskList onSetUpdateValue={setTaskValue} categoriesOptions={categoriesOptions} />
    </div>
  );
};

export default Task;
