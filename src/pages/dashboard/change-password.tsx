import { Helmet } from 'react-helmet-async';

import ChangePasswordPage from 'src/sections/change-profile/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Change Password</title>
      </Helmet>

      <ChangePasswordPage />
    </>
  );
}
