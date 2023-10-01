import * as Yup from 'yup';

export type TTask = {
  _id: string;
  taskTitle: string;
  taskCategory: string;
  taskPriorities: string;
  userId: string;
  isCompleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const taskSchema = Yup.object().shape({
  taskTitle: Yup.string().required('Title is required.'),
  taskCategory: Yup.string(),
});

export type TTaskUpsert = Yup.InferType<typeof taskSchema>;
