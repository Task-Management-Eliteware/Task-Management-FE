import * as Yup from 'yup';
import { TCategories } from './categories';

export type TTask = {
  _id: string;
  taskTitle: string;
  taskDescription?: string;
  taskCategoryId: string;
  taskPriorities: string;
  userId: string;
  isCompleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TTaskList = TTask & { tasksCategory: TCategories };

export const taskSchema = Yup.object().shape({
  _id: Yup.string(),
  taskTitle: Yup.string().required('Title is required.'),
  taskCategoryId: Yup.string(),
  taskDescription: Yup.string(),
  taskPriorities: Yup.string(),
});

export type TTaskUpsert = Yup.InferType<typeof taskSchema>;
