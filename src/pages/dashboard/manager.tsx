import { Helmet } from 'react-helmet-async';

import ManagerPage from 'src/sections/manager/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Manager</title>
      </Helmet>

      <ManagerPage />
    </>
  );
}
