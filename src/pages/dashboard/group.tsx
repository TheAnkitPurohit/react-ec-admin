import { Helmet } from 'react-helmet-async';

import GroupPage from 'src/sections/group/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Dashboard: Group</title>
      </Helmet>

      <GroupPage />
    </>
  );
}
