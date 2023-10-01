import React, { FC } from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { IForm, TFormInput, TTextDefaultValue } from 'components/models';

const MuiInput: FC<TextFieldProps> = (props) => {
  const { variant = 'outlined' } = props;
  return <TextField variant={variant} {...props} />;
};

const customInput = <T extends FieldValues>(hookMethods: UseFormReturn<T>) => {
  const Input = (props: TFormInput<T>) => {
    const { name, defaultValue, ...textFieldProps } = props;
    const { control } = hookMethods;

    return (
      <Controller
        defaultValue={(defaultValue || undefined) as TTextDefaultValue<T>}
        control={control}
        name={name}
        render={({ field: { ref, ...restField }, fieldState: { error } }) => {
          return (
            <MuiInput helperText={error ? error.message : null} error={!!error} {...restField} {...textFieldProps} />
          );
        }}
      />
    );
  };
  return Input;
};

export const customForm = <T extends FieldValues>(hookMethods: UseFormReturn<T>) => {
  const Form = (props: IForm<T>) => {
    const { children, onSubmit } = props;
    const { handleSubmit } = hookMethods;

    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      </div>
    );
  };
  Form.Input = customInput<T>(hookMethods);
  return Form;
};
