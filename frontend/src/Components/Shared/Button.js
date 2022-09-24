import React from 'react';
import { Button as MaterialButton } from '@mui/material';

export const Button = ({ text, ...props }) => {
  return <MaterialButton {...props}>{text}</MaterialButton>;
};
