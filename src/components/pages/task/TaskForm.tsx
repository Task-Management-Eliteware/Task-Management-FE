/* eslint-disable no-underscore-dangle */
import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TTaskUpsert, taskSchema, useCreateTask, useGetCategoriesList, useUpdateTask } from 'shared';
import { customForm } from 'components/common';
import { MenuItemType } from 'components/common/models';

type TTaskFormProps = {
  task: TTaskUpsert | undefined;
  categoriesOptions: MenuItemType[];
  onSetUpdateValue: (value: TTaskUpsert) => void;
};

const TaskForm: FC<TTaskFormProps> = (props) => {
  const { task, onSetUpdateValue, categoriesOptions } = props;

  const [createTask] = useCreateTask();
  const [updateTask] = useUpdateTask();

  const formMethods = useForm<TTaskUpsert>({
    mode: 'all',
    values: task,
    resolver: yupResolver(taskSchema),
  });

  const resetFormObj = { taskTitle: '', taskCategoryId: '', _id: '', taskPriorities: undefined };

  const Form = useMemo(() => customForm(formMethods), [task, categoriesOptions.length]);

  const onSubmit: SubmitHandler<TTaskUpsert> = async (data) => {
    try {
      if (data?._id) {
        await updateTask(data);
        formMethods.reset(resetFormObj);
        return;
      }

      await createTask(data);
      formMethods.reset(resetFormObj);
    } catch (err) {
      console.log('err:', err);
    }
  };

  const onCancel = () => {
    if (task) {
      onSetUpdateValue(resetFormObj);
    }
    formMethods.reset(resetFormObj);
  };

  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-body">
          <Form onSubmit={onSubmit}>
            <Form.Input className="form-control" label="Task Title" name="taskTitle" />
            <Form.Dropdown
              className="form-control"
              label="Task Category"
              menuItems={categoriesOptions}
              sx={{ minWidth: 150 }}
              variant="outlined"
              name="taskCategoryId"
            />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <button className="mx-3 btn btn-primary" type="reset" onClick={onCancel}>
              cancel
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
