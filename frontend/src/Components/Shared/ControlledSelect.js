import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

export const ControlledSelect = ({ data, name, control, label, disabled }) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl sx={{ minWidth: '15rem' }} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      >
        {data?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
