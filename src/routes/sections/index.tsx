import { Navigate, useRoutes } from 'react-router-dom';

import useAuth from 'src/hooks/use-auth';

import { PATH_AFTER_LOGIN, PATH_AFTER_REGISTER } from 'src/config-global';

import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------

export default function Router() {
  const { token } = useAuth();

  return useRoutes([
    {
      path: '/',
      element: <Navigate to={token ? PATH_AFTER_LOGIN : PATH_AFTER_REGISTER} replace />,
    },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // Main routes
    ...mainRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
