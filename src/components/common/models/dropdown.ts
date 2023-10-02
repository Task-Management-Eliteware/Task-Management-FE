import { FormControlProps, InputLabelProps, SelectProps } from '@mui/material';

export type MenuItemType = {
  itemValue: string;
  itemLabel: string;
  [key: string]: string | number;
};

export interface DropdownProps extends SelectProps {
  index?: number;
  defaultValue?: string | string[];
  menuItems: MenuItemType[];
  label: string;
  name?: string;
  showSelectedValue?: boolean;
  value?: string | string[];
  labelProps?: InputLabelProps;
  type?: 'single' | 'multiple';
  withSearch?: boolean;
  uncheckedAllSelectedOptions?: () => void;
  formControllerProps?: FormControlProps;
  limitTag?: number;
  parentStyles?: string;
  childStyles?: string;
}
