import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import AuthCompactLayout from 'src/layouts/compact';
import AuthClassicLayout from 'src/layouts/auth/classic';
import SetPasswordPage from 'src/pages/auth/SetPassword';
import ForgotPasswordPage from 'src/pages/auth/ForgotPassword';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    element: (
      <GuestGuard>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </GuestGuard>
    ),
    children: [
      {
        path: 'login',
        element: (
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <AuthClassicLayout>
            <ForgotPasswordPage />
          </AuthClassicLayout>
        ),
      },
      {
        path: '/set-password/:token',
        element: (
          <AuthCompactLayout>
            <SetPasswordPage />
          </AuthCompactLayout>
        ),
      },
    ],
  },
];
