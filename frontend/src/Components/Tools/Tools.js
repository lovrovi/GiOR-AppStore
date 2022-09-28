import React, { Suspense } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useGetAllTools } from 'Api/Tools/GetAll';
import { Card } from 'Components/Shared/Card';
import { routes } from 'Router/router';

export const Tools = () => {
  const navigate = useNavigate();
  const { data } = useGetAllTools({ select: (data) => data.data });

  const navigateToCreate = () => {
    navigate(generatePath(routes.TOOLS_CREATE));
  };

  return (
    <div>
      <div>
        <IconButton size="large" onClick={navigateToCreate}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </div>

      <Suspense fallback={<CircularProgress />}>
        {data?.map((item, i) => {
          return (
            <Card
              key={i}
              title={item.name}
              text={item.description}
              id={item.id}
            >
              <Typography>Price: {item.price}</Typography>
            </Card>
          );
        })}
      </Suspense>
    </div>
  );
};
