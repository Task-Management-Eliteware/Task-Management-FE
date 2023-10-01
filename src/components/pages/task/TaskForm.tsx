import React, { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TTaskUpsert, taskSchema, useCreateTask, useUpdateTask } from 'shared';
import { customForm } from 'components/common';

const TaskForm = () => {
  const [createTask] = useCreateTask();
  const [updateTask] = useUpdateTask();

  const formMethods = useForm<TTaskUpsert>({
    mode: 'all',
    resolver: yupResolver(taskSchema),
  });

  const Form = useMemo(() => customForm(formMethods), []);

  const onSubmit: SubmitHandler<TTaskUpsert> = (data) => {
    createTask(data)
      .unwrap()
      .then((res) => {
        formMethods.reset({ taskTitle: '', taskCategory: '' });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-body">
          <Form onSubmit={onSubmit}>
            <Form.Input className="form-control" label="Task Title" name="taskTitle" />
            <Form.Input className="form-control" label="Task Category" name="taskCategory" />
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
