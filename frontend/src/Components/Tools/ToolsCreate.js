import React from 'react';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { ControlledTextField } from 'Components/Shared/ControlledTextField';
import { ControlledSelect } from 'Components/Shared/ControlledSelect';
import { TOOL_TYPES } from 'lib/constants';
import { useGetAllProducers } from 'Api/Producers/GetAll';
import { usePostTool } from 'Api/Tools/Post';
import { Button } from 'Components/Shared/Button';

export const ToolsCreate = () => {
  const { data: producers } = useGetAllProducers();
  const { mutate } = usePostTool();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      type: '',
      producerId: '',
    },
  });

  return (
    <Stack
      spacing={2}
      alignItems="center"
      component="form"
      onSubmit={handleSubmit(mutate)}
    >
      <ControlledTextField control={control} name="name" />
      <ControlledTextField control={control} name="description" />
      <ControlledTextField control={control} name="price" />
      <ControlledSelect
        control={control}
        name="type"
        label="Tool type:"
        data={TOOL_TYPES}
      />
      <ControlledSelect
        control={control}
        name="producerId"
        label="Producer:"
        data={producers}
      />
      <Button type="submit" text="submit" />
    </Stack>
  );
};
