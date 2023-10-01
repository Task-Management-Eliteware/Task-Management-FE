import * as Yup from 'yup';

export type TLoginReturn = {
  token: string;
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required.'),
  password: Yup.string().required('Password is required.'),
});

export type TLogin = Yup.InferType<typeof loginSchema>;
