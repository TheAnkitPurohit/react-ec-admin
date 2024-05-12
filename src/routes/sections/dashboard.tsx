import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const DashboardPage = lazy(() => import('src/pages/dashboard'));
const CategoryPage = lazy(() => import('src/pages/dashboard/category'));
const GroupPage = lazy(() => import('src/pages/dashboard/group'));
const ManagerPage = lazy(() => import('src/pages/dashboard/manager'));
const ProfilePage = lazy(() => import('src/pages/dashboard/profile'));
const ChangePasswordPage = lazy(() => import('src/pages/dashboard/change-password'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { element: <DashboardPage />, index: true },
      { path: 'sales', element: <CategoryPage /> },
      { path: 'users', element: <CategoryPage /> },
      { path: 'products', element: <CategoryPage /> },
      { path: 'category', element: <CategoryPage /> },
      { path: 'group', element: <GroupPage /> },
      { path: 'review', element: <CategoryPage /> },
      { path: 'inquiry', element: <CategoryPage /> },
      { path: 'manager', element: <ManagerPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'change-password', element: <ChangePasswordPage /> },
    ],
  },
];
