import React, { FC } from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { Button } from './Button';
import { Dropdown } from './Dropdown';
import { DropdownProps, IForm, IFromDropDown, TFormButtonProps, TFormInput, TTextDefaultValue } from './models';

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
            <div className="mb-3">
              <MuiInput
                helperText={error ? error.message : null}
                error={!!error}
                fullWidth
                {...restField}
                {...textFieldProps}
              />
            </div>
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
            <div className="mb-3">
              <Dropdown
                inputRef={ref}
                error={!!error}
                uncheckedAllSelectedOptions={props.withSearch ? handleUncheckedAllSelectedOptions : undefined}
                {...restField}
                {...rest}
                className="form-control"
              />
              <FormHelperText error={!!error}>{error?.message}</FormHelperText>
            </div>
          );
        }}
      />
    );
  };
  return FormDropdown;
};

const customButton = <T extends FieldValues>(hookMethods: UseFormReturn<T>, staticProps?: TFormButtonProps) => {
  const SubmitButton = (props: TFormButtonProps) => {
    props = { ...staticProps, ...props };
    const {
      formState: { isValid },
    } = hookMethods;

    const buttonTypes = {
      submit: 'btn btn-primary',
      reset: '',
      button: '',
    };

    const btnClass = props.type ? buttonTypes[props.type] : '';

    return <Button className={btnClass} disabled={!isValid} {...props} />;
  };
  return SubmitButton;
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
  Form.SubmitButton = customButton<T>(hookMethods, { type: 'submit' });
  Form.ResetButton = customButton<T>(hookMethods, { type: 'reset' });

  return Form;
};
