import React, { Suspense, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useGetAllProducers } from 'Api/Producers/GetAll';
import { useGetToolsById } from 'Api/Tools/GetById';
import { usePutTool } from 'Api/Tools/Put';
import { TOOL_TYPES } from 'lib/constants';
import { Button } from 'Components/Shared/Button';
import { ControlledSelect } from 'Components/Shared/ControlledSelect';
import { ControlledTextField } from 'Components/Shared/ControlledTextField';

export const ToolsEdit = () => {
  let { id } = useParams();

  const { data: producers } = useGetAllProducers();
  const { data: toolData, isFetched } = useGetToolsById(id);
  const { mutate } = usePutTool(id);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: toolData?.name ?? '',
      description: toolData?.description ?? '',
      price: toolData?.price ?? '',
      type: toolData?.type ?? '',
      producerId: toolData?.producerId ?? '',
    },
  });

  useEffect(() => {
    if (isFetched) reset(toolData);
  }, [isFetched, reset, toolData]);

  return (
    <Suspense fallback={<CircularProgress />}>
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
    </Suspense>
  );
};
