import React, { FC, ReactNode, useState } from 'react';
import {
  Checkbox,
  ListSubheader,
  OutlinedInput,
  Radio,
  TextField,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { DropdownProps, MenuItemType } from './models';

const SelectMultipleOptions = (items: MenuItemType[], value: string[] | string) => {
  return items.map((item) => (
    <MenuItem key={nanoid()} value={item.itemValue}>
      <Checkbox checked={value?.includes(item.itemValue)} />
      <ListItemText primary={item.itemLabel} />
    </MenuItem>
  ));
};

const SelectSingleOption = (items: MenuItemType[]) => {
  return items.map((item) => (
    <MenuItem key={nanoid()} value={item.itemValue}>
      {item.itemLabel}
    </MenuItem>
  ));
};

type SearchTagType = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  uncheckedAllSelectedOptions?: () => void;
  menuItems: MenuItemType[];
  value: string[] | string;
};

const SearchTag = (options: SearchTagType) => {
  const { handleSearch, uncheckedAllSelectedOptions, value, menuItems } = options;
  return (
    <ListSubheader key="dsflkjdkfjkjdslkfj">
      <div>
        <Radio checked={value?.length === menuItems.length} onClick={uncheckedAllSelectedOptions} />
        <ListItemText primary={value?.length === menuItems.length ? 'Clear All' : 'Select All'} />
      </div>

      <TextField
        fullWidth
        autoFocus
        size="small"
        onChange={handleSearch}
        onKeyDown={(e) => {
          if (e.key !== 'Escape') {
            e.stopPropagation();
          }
        }}
      />
    </ListSubheader>
  );
};

export const Dropdown: FC<DropdownProps> = (props) => {
  const {
    name,
    label,
    value = '',
    menuItems,
    labelProps,
    formControllerProps,
    type = 'single',
    withSearch = false,
    showSelectedValue = false,
    defaultValue,
    uncheckedAllSelectedOptions,
    limitTag = 1,
    ...rest
  } = props;
  const [searchedItemList, setSearchedItemList] = useState<MenuItemType[]>(menuItems);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value: searchString } = e.target;

    const identicalMatchedList: MenuItemType[] = [];
    const partialMatchedList: MenuItemType[] = [];

    menuItems
      .filter((item) => item.itemLabel.toLocaleLowerCase().includes(searchString.toLowerCase()))
      .forEach((item) => {
        if (item.itemLabel.toLowerCase().startsWith(searchString.toLowerCase())) {
          identicalMatchedList.push(item);
        } else {
          partialMatchedList.push(item);
        }
      });

    setSearchedItemList([...identicalMatchedList, ...partialMatchedList]);
  };

  const handleClose = () => {
    const filteredSelectedValues = menuItems.filter(({ itemValue }) => value?.includes(itemValue));
    const filteredNotSelectedValues = menuItems.filter(({ itemValue }) => !value?.includes(itemValue));
    setSearchedItemList([...filteredSelectedValues, ...filteredNotSelectedValues]);
  };

  return (
    <FormControl {...formControllerProps}>
      <InputLabel {...{ ...labelProps, error: rest.error }}>{label}</InputLabel>
      <Select
        name={name}
        multiple={type !== 'single'}
        defaultValue={type === 'single' ? defaultValue || '' : []}
        renderValue={
          type === 'single'
            ? (selected: any) => menuItems.find((el) => el.itemValue === selected.toString())?.itemLabel
            : (selected: any) => {
                const findLabels = menuItems
                  .filter(({ itemValue }) => selected.includes(itemValue))
                  .map(({ itemLabel }) => itemLabel);

                const displayValue =
                  findLabels.length > limitTag
                    ? `${findLabels.slice(0, limitTag)}  (+${findLabels.length - limitTag})`
                    : findLabels.join(', ');
                return displayValue;
              }
        }
        value={type === 'single' ? value || '' : value || []}
        input={<OutlinedInput label={label} />}
        onClose={type === 'multiple' ? handleClose : undefined}
        label={label}
        MenuProps={{ autoFocus: !withSearch }}
        {...rest}
      >
        {type === 'single'
          ? [
              withSearch && SearchTag({ handleSearch, uncheckedAllSelectedOptions, value, menuItems }),
              SelectSingleOption(searchedItemList),
            ]
          : [
              withSearch && SearchTag({ handleSearch, uncheckedAllSelectedOptions, value, menuItems }),
              SelectMultipleOptions(searchedItemList, value),
            ]}
      </Select>
    </FormControl>
  );
};
