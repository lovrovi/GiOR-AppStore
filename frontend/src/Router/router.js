import { createBrowserRouter } from 'react-router-dom';

import { Navbar } from 'Components/Shared/Navbar';
import { Tools } from 'Components/Tools/Tools';
import { ToolsCreate } from 'Components/Tools/ToolsCreate';
import { ToolsDetails } from 'Components/Tools/ToolsDetails';
import { ToolsEdit } from 'Components/Tools/ToolsEdit';
import { Login } from 'Components/Login/Login';

export const routes = {
  TOOLS: '/tools',
  TOOLS_DETAILS: '/tools/:id',
  TOOLS_CREATE: '/tools/add',
  TOOLS_EDIT: '/tools/:id/edit',
  LOGIN: '/login',
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: routes.TOOLS,
        element: <Tools />,
      },
      {
        path: routes.TOOLS_DETAILS,
        element: <ToolsDetails />,
      },
      {
        path: routes.TOOLS_CREATE,
        element: <ToolsCreate />,
      },
      {
        path: routes.TOOLS_EDIT,
        element: <ToolsEdit />,
      },
    ],
  },
]);
