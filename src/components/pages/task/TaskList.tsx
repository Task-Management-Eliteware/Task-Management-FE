/* eslint-disable no-underscore-dangle */
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { TPagination, TTask, TTaskList, TUpdate, useCheckedTask, useDeleteTask, useGetTasksList } from 'shared';
import { useImmer } from 'use-immer';
import { Pagination, Dropdown, MenuItemType, MuiCheckbox, Button } from 'components/common';

type TTaskListProps = {
  isCategoryListFetched: boolean;
  onSetUpdateValue: (value: TUpdate) => void;
  categoriesOptions: MenuItemType[];
};

const TaskList: FC<TTaskListProps> = (props) => {
  const { onSetUpdateValue, categoriesOptions, isCategoryListFetched } = props;
  const [pagination, setPagination] = useImmer<TPagination>({
    pageNumber: 1,
    limit: 5,
  });

  const { data: list, isSuccess } = useGetTasksList(pagination, { skip: !isCategoryListFetched });
  const [checkedTask] = useCheckedTask();
  const [deleteTask] = useDeleteTask();

  const [filter, setFilter] = useState({
    categories: [] as string[],
  });

  const taskList = list?.result.data || [];
  const apiPagination = list?.result.pagination;

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPagination((state) => {
      state.pageNumber = +value;
      state.taskCategories = [];
    });
  };

  const handleSelectCategory = (e: any) => {
    setFilter({ categories: [...e.target.value] });
    setPagination((state) => {
      state.pageNumber = 1;
      state.limit = 5;
      state.taskCategories = [...e.target.value];
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTask = (task: TUpdate) => {
    const { _id, taskTitle, taskCategoryId, taskDescription } = task;
    onSetUpdateValue({ _id, taskTitle, taskCategoryId, taskDescription });
  };

  const handleCheckedTask = async (task: TTask) => {
    const { isCompleted, _id } = task;
    try {
      await checkedTask({ isCompleted: !isCompleted, _id }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-2">
      <div className="card">
        <div className="card-header">
          <div className="filter">
            <Dropdown
              label="Category"
              type="multiple"
              variant="outlined"
              limitTag={3}
              menuItems={categoriesOptions}
              onChange={handleSelectCategory}
              sx={{ m: 1, minWidth: 250 }}
              value={filter.categories}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-vcenter">
              <thead>
                <tr>
                  <th>Completed</th>

                  <th>Task</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {taskList?.map((data) => (
                  <tr>
                    <td className="text-secondary">
                      <MuiCheckbox checked={data.isCompleted} onChange={() => handleCheckedTask(data)} />
                    </td>
                    <td className="text-secondary">{data.taskTitle}</td>
                    <td className="text-secondary">
                      <td className="text-secondary">{data.tasksCategory.categoryType}</td>
                    </td>
                    <td className="text-secondary">
                      <td className="text-secondary">{data.taskDescription}</td>
                    </td>
                    <td className="text-secondary">
                      <Button className="btn btn-info me-3" onClick={() => handleUpdateTask(data)}>
                        Update
                      </Button>
                      <Button className="btn btn-danger me-3" onClick={() => handleDeleteTask(data._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isSuccess && apiPagination && (
            <Pagination
              count={Math.ceil(apiPagination.totalRecords / pagination.limit)}
              pageNo={pagination.pageNumber}
              page={pagination.pageNumber}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              size="large"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
