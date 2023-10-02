import React, { FC } from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { Dropdown } from './Dropdown';
import { DropdownProps, IForm, IFromDropDown, TFormInput, TTextDefaultValue } from './models';

const MuiInput: FC<TextFieldProps> = (props) => {
  const { variant = 'outlined' } = props;
  return <TextField variant={variant} {...props} />;
};

const customInput = <T extends FieldValues>(hookMethods: UseFormReturn<T>) => {
  const FormInput = (props: TFormInput<T>) => {
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
  return FormInput;
};

const customDropdown = <T extends FieldValues>(hookMethods: UseFormReturn<T>) => {
  const FormDropdown = (props: IFromDropDown<T>) => {
    const { name, ...rest } = props;

    const { control } = hookMethods;
    const handleUncheckedAllSelectedOptions = () => {
      // setValue(name, []);
    };

    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, ...restField }, fieldState: { error } }) => {
          return (
            <>
              <Dropdown
                inputRef={ref}
                error={!!error}
                uncheckedAllSelectedOptions={props.withSearch ? handleUncheckedAllSelectedOptions : undefined}
                {...restField}
                {...rest}
              />
              <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            </>
          );
        }}
      />
    );
  };
  return FormDropdown;
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
  Form.Dropdown = customDropdown<T>(hookMethods);

  return Form;
};
