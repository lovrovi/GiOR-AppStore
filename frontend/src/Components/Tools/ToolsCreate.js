import React from 'react';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import { ControlledTextField } from 'Components/Shared/ControlledTextField';
import { ControlledSelect } from 'Components/Shared/ControlledSelect';
import { TOOL_TYPES } from 'lib/constants';
import { useGetAllProducers } from 'Api/Producers/GetAll';
import { usePostTool } from 'Api/Tools/Post';
import { Button } from 'Components/Shared/Button';
import { useSecuredRoute } from 'lib/hooks/useSecuredRoute';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToolSchema } from 'lib/validators/ToolValidator';
import { generatePath, useNavigate } from 'react-router-dom';
import { routes } from 'Router/router';

export const ToolsCreate = () => {
  useSecuredRoute();
  const navigate = useNavigate();

  const { data: producers } = useGetAllProducers();
  const { mutate } = usePostTool({
    onSuccess: () => navigate(generatePath(routes.TOOLS)),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      type: '',
      producerId: '',
    },
    resolver: yupResolver(ToolSchema),
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
