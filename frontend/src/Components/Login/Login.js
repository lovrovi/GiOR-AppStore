import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useLogin } from 'Api/Login/Login';
import { Button } from 'Components/Shared/Button';
import { ControlledTextField } from 'Components/Shared/ControlledTextField';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { generatePath, useNavigate } from 'react-router-dom';
import { routes } from 'Router/router';
import styled from 'styled-components';

export const Login = () => {
  const navigate = useNavigate();
  const { mutate, isError, isLoading, isSuccess } = useLogin();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isSuccess) navigate(generatePath(routes.TOOLS));
  }, [isSuccess, navigate]);

  return (
    <StyledPaper>
      <StyledForm onSubmit={handleSubmit(mutate)}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          LOGIN
        </Typography>
        <ControlledTextField control={control} name="username" />
        <ControlledTextField
          control={control}
          name="password"
          type="password"
        />

        {isError && (
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', color: 'red' }}
          >
            Invalid credentials
          </Typography>
        )}
        <Button text="Log in" type="submit" />
      </StyledForm>
      {isLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  && {
    justify-content: center;
    display: flex;
    flex-direction: column;
    max-width: 40%;
    margin: auto;
    align-items: center;
    margin-top: 200px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
`;
