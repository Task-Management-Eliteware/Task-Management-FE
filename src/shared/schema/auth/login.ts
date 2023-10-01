import * as Yup from 'yup';

export const loginSchema = Yup.lazy(() =>
  Yup.object().shape({
    email: Yup.string().required('First Name is required.'),
    password: Yup.string().required('Last Name is required.'),
  })
);

export type TLogin = Yup.InferType<typeof loginSchema>;
