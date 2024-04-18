import { Helmet } from 'react-helmet-async';

import CategoryPage from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Category</title>
      </Helmet>

      <CategoryPage />
    </>
  );
}
