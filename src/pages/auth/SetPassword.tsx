import { Helmet } from 'react-helmet-async';

import SetPasswordView from 'src/sections/auth/SetPasswordView';

// ----------------------------------------------------------------------

export default function SetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Set Password</title>
      </Helmet>

      <SetPasswordView />
    </>
  );
}
