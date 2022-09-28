import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import { saveToken } from "../../Redux/Actions/auth/auth";
// import useIsLoggedIn from "../../Hooks/useIsLoggedIn";
// import { Button } from './Button';
import { Outlet, useNavigate } from 'react-router-dom';
import { useVerifyToken } from 'Api/Login/Verify';

export const Navbar = ({ title }) => {
  const navigate = useNavigate();

  // const isLoggedIn = useIsLoggedIn();
  // const history = useHistory();
  // const dispatch = useDispatch();

  // const logoutHandler = () => {
  //   dispatch(saveToken(null));
  //   history.push(generateLink(routes.LOGIN));
  // };

  const goBackHandler = () => {
    navigate(-1);
  };

  const { isError, isSuccess } = useVerifyToken();

  console.log('er', isError);
  console.log('suc', isSuccess);
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
            {/* <Box sx={{ display: { xs: "none", md: "flex" }, mr: 3 }}>
      <Button
        // onClick={() => history.push(generateLink(routes.CATEGORIES))}
        sx={{ color: "white", display: "block" }}
        text="Categories"
      />

      {isLoggedIn ? (
        <Button
          // onClick={() => history.push(generateLink(routes.INGREDIENTS))}
          sx={{ color: "white", display: "block" }}
          text="Ingredients"
        />
      ) : (
        <></>
      )}
    </Box> */}

            {/* <Button
      variant="outlined"
      color="inherit"
      // onClick={logoutHandler}
      // text={isLoggedIn ? "Logout" : "Login"}
    /> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};
