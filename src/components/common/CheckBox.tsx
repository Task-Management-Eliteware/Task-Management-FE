import React, { FC } from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

export const MuiCheckbox: FC<CheckboxProps> = (props) => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return <Checkbox {...props} inputProps={{ 'aria-label': 'controlled' }} />;
};
