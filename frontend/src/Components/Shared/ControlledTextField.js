import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

export const ControlledTextField = ({ name, control, multiline, ...props }) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      label={`${name}:`}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      error={error}
      helperText={error?.message}
      InputLabelProps={{ sx: { textTransform: 'capitalize' } }}
      multiline={multiline}
      sx={{ mt: 2 }}
      {...props}
    />
  );
};
