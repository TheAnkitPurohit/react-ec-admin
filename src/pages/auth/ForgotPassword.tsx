import { Helmet } from 'react-helmet-async';

import ForgotPasswordView from 'src/sections/auth/ForgotPasswordView';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Forgot Password</title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
