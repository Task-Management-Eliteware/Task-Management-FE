/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

export type TLoginReturn = {
  token: string;
};

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const nameRegex = /^[a-zA-Z ]{2,20}$/;
export const loginSchema = Yup.object().shape({
  email: Yup.string().matches(emailRegex, 'Please enter valid email').required('Email is required.'),
  password: Yup.string().min(4, 'Password should be at least 4 characters long').required('Password is required.'),
});

export const signUpSchema = loginSchema.shape({
  firstName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .matches(nameRegex, 'Please enter valid name')
    .required('First Name is required.'),
  lastName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .matches(nameRegex, 'Please enter valid name')
    .required('Last Name is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password not matched.')
    .required('Confirm Password is required.'),
});

export type TLogin = Yup.InferType<typeof loginSchema>;
export type TSignUP = Yup.InferType<typeof signUpSchema>;
