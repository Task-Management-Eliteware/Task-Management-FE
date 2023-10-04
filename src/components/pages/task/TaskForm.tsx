/* eslint-disable no-underscore-dangle */
import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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
    defaultValues: {
      taskCategoryId: '',
      taskDescription: '',
      taskTitle: '',
    },
    resolver: yupResolver(taskSchema),
  });

  const resetFormObj: TTaskUpsert = {
    taskTitle: '',
    taskCategoryId: '',
    _id: '',
    taskDescription: '',
  };

  const Form = useMemo(() => customForm(formMethods), [task, categoriesOptions.length]);

  const onSubmit: SubmitHandler<TTaskUpsert> = async (data) => {
    try {
      if (data?._id) {
        await updateTask(data).unwrap();
        formMethods.reset(resetFormObj);
        toast.success('Task updated.');
        return;
      }

      await createTask(data).unwrap();
      formMethods.reset(resetFormObj);
      toast.success('Task Added.');
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
            <div className="row">
              <div className="col-6">
                <Form.Input label="Title" name="taskTitle" />
              </div>
              <div className="col-6">
                <Form.Input label="Description" name="taskDescription" />
              </div>
              <div className="col-6">
                <Form.Dropdown
                  label="Category"
                  menuItems={categoriesOptions}
                  variant="outlined"
                  formControllerProps={{
                    fullWidth: true,
                  }}
                  name="taskCategoryId"
                />
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <Form.ResetButton className="btn btn-secondary text-light me-3" onClick={onCancel}>
                    cancel
                  </Form.ResetButton>
                  <Form.SubmitButton className="btn btn-primary text-light">Submit</Form.SubmitButton>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
