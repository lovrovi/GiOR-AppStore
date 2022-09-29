import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button } from 'Components/Shared/Button';
import { generatePath, Outlet, useNavigate } from 'react-router-dom';
import { routes } from 'Router/router';
import { hasToken } from 'lib/helpers/hasToken';

export const Navbar = ({ title }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate(generatePath(routes.LOGIN));
  };

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={goBackHandler}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              edge="start"
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>

            {hasToken() && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={logoutHandler}
                text="Logout"
              />
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};
