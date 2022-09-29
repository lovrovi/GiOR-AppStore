import React, { Suspense, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useGetAllProducers } from 'Api/Producers/GetAll';
import { useGetToolsById } from 'Api/Tools/GetById';
import { usePutTool } from 'Api/Tools/Put';
import { TOOL_TYPES } from 'lib/constants';
import { Button } from 'Components/Shared/Button';
import { ControlledSelect } from 'Components/Shared/ControlledSelect';
import { ControlledTextField } from 'Components/Shared/ControlledTextField';
import { useSecuredRoute } from 'lib/hooks/useSecuredRoute';
import { isAdmin } from 'lib/helpers/isAdmin';
import { ToolSchema } from 'lib/validators/ToolValidator';
import { routes } from 'Router/router';

export const ToolsEdit = () => {
  useSecuredRoute();
  let { id } = useParams();
  const navigate = useNavigate();

  const { data: producers } = useGetAllProducers();
  const { data: toolData, isFetched, isLoading } = useGetToolsById(id);
  const { mutate } = usePutTool(id, {
    onSuccess: () => navigate(generatePath(routes.TOOLS)),
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: toolData?.name ?? '',
      description: toolData?.description ?? '',
      price: toolData?.price ?? '',
      type: toolData?.type ?? '',
      producerId: toolData?.producerId ?? '',
    },
    resolver: yupResolver(ToolSchema),
  });

  useEffect(() => {
    if (isFetched) reset(toolData);
  }, [isFetched, reset, toolData]);

  const disabled = !isAdmin();

  return (
    <Suspense fallback={<CircularProgress />}>
      <Stack
        spacing={2}
        alignItems="center"
        component="form"
        onSubmit={handleSubmit(mutate)}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <ControlledTextField
              control={control}
              name="name"
              disabled={disabled}
            />
            <ControlledTextField
              control={control}
              name="description"
              disabled={disabled}
            />
            <ControlledTextField
              control={control}
              name="price"
              disabled={disabled}
            />
            <ControlledSelect
              control={control}
              name="type"
              label="Tool type:"
              data={TOOL_TYPES}
              disabled={disabled}
            />
            <ControlledSelect
              control={control}
              name="producerId"
              label="Producer:"
              data={producers}
              disabled={disabled}
            />
            {!disabled && <Button type="submit" text="submit" />}
          </>
        )}
      </Stack>
    </Suspense>
  );
};
