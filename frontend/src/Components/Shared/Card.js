import React, { useState } from 'react';
import { Card as MaterialCard } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { generatePath, useNavigate } from 'react-router-dom';
import { routes } from 'Router/router';
import { useDeleteTool } from 'Api/Tools/Delete';

export const Card = ({ title, text, children, id }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { mutate } = useDeleteTool();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    navigate(generatePath(routes.TOOLS_EDIT, { id }));
  };
  const handleDelete = () => {
    mutate(id);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MaterialCard
      sx={{ maxWidth: 550, display: 'inline-block', margin: '10px 60px' }}
    >
      <CardHeader
        action={
          <>
            <IconButton
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleEdit}>
                <EditIcon />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteForeverIcon />
                Delete
              </MenuItem>
            </Menu>
          </>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2">{text}</Typography>
      </CardContent>
      <CardActions>{children}</CardActions>
    </MaterialCard>
  );
};
