import { createBrowserRouter } from 'react-router-dom';

import { Navbar } from 'Components/Shared/Navbar';
import { Tools } from 'Components/Tools/Tools';
import { ToolsCreate } from 'Components/Tools/ToolsCreate';
import { ToolsEdit } from 'Components/Tools/ToolsEdit';
import { Login } from 'Components/Login/Login';

export const routes = {
  TOOLS: '/tools',
  TOOLS_CREATE: '/tools/add',
  TOOLS_EDIT: '/tools/:id',
  LOGIN: '/',
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
