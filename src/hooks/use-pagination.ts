import { useNavigate } from 'react-router-dom';

import { useRouter, useSearchParams } from 'src/routes/hooks';

const usePagination = () => {
  const initialPaginationValues = {
    page: 1,
    paginationPerPage: 10,
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const navigate = useNavigate();

  const handleNavigationPaginationPerPage = (paginationPerPage: number) => {
    const search = new URLSearchParams(searchParams);
    search.set('paginationPerPage', String(paginationPerPage));
    const searchString = search.toString();
    router.push(`?${searchString}`);
  };

  const handleNavigationPage = (newPage: number) => {
    const search = new URLSearchParams(searchParams);
    if (search.getAll('').length === 0 && newPage === initialPaginationValues?.page) {
      navigate({
        search: '',
      });

      return;
    }
    search.set('page', String(newPage));
    const searchString = search.toString();
    router.push(`?${searchString}`);
  };

  return {
    initialPaginationValues,
    handleNavigationPaginationPerPage,
    handleNavigationPage,
  };
};

export default usePagination;
