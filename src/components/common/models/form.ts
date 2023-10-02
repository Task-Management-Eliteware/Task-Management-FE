import { ReactNode, FormHTMLAttributes, FormEvent } from 'react';
import { FieldPath, FieldPathValue, FieldValues, SubmitHandler } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import { customForm } from 'components/common';
import { DropdownProps } from './dropdown';

export type TFormEvent = FormEvent<HTMLFormElement>;

export interface IForm<T extends FieldValues> extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
}

export type TFieldName<TValue extends FieldValues> = FieldPath<TValue>;
export type TTextDefaultValue<TValue extends FieldValues> = FieldPathValue<TValue, FieldPath<TValue>>;

export type TFormInput<TValue extends FieldValues> = {
  name: TFieldName<TValue>;
  label: string;
} & TextFieldProps;

export interface IFromDropDown<TValue extends FieldValues> extends DropdownProps {
  name: TFieldName<TValue>;
}

export type TFormReturn<T extends FieldValues> = ReturnType<typeof customForm<T>>;
export type TCustomFormReturn<T extends FieldValues> = { Form: TFormReturn<T> };
