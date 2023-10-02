import * as Yup from 'yup';

export type TCategories = {
  _id: string;
  categoryType: string;
  userId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const categoriesSchema = Yup.object().shape({
  _id: Yup.string(),
  categoryType: Yup.string().required('Category is required.'),
});

export type TCategoryUpsert = Yup.InferType<typeof categoriesSchema>;
