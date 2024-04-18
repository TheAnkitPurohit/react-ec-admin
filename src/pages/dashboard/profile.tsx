import { Helmet } from 'react-helmet-async';

import ProfilePage from 'src/sections/profile/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Profile</title>
      </Helmet>

      <ProfilePage />
    </>
  );
}
