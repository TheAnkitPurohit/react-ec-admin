import dayjs from 'dayjs';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import useToaster from 'src/hooks/use-toaster';
import { useBoolean } from 'src/hooks/use-boolean';
import usePagination from 'src/hooks/use-pagination';

import adminService from 'src/services/adminService';

import PageTitle from 'src/components/typography/PageTitle';
import MainDarkBtn from 'src/components/buttons/MainDarkBtn';
import { LinearProgressLoader } from 'src/components/loader';
import FormProvider from 'src/components/hook-form/form-provider';
import DeleteModal from 'src/components/modal/common/DeleteModal';
import AdminSearchFilter from 'src/components/search-filter/admin';
import CreateAdminModal from 'src/components/modal/admin/CreateAdminModal';
import MultiFunctionalTable from 'src/components/CommonTable/MultiFunctionalTable';
import AdminFilterResult from 'src/components/search-filter/admin/AdminFilterResult';

const ManagerPage = () => {
  const [selectedAdmin, setSelectedAdmin] = useState<Admin>();

  const searchParams = useSearchParams();
  const router = useRouter();
  const { initialPaginationValues, handleNavigationPage, handleNavigationPaginationPerPage } =
    usePagination();
  const { errorToast, successToast } = useToaster();

  const initialValues: AdminSearchFilterInterface = {
    search: '',
    dateRange: undefined,
    status: {
      label: '',
      value: '',
    },
    ...initialPaginationValues,
  };

  const handlePaginationPerPageChange = (value: number) => {
    setFilters({ ...filters, paginationPerPage: value, page: initialValues?.page });
    handleNavigationPaginationPerPage(value);
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
    handleNavigationPage(newPage);
  };

  const startDateParam = searchParams.get('startDate');
  const startDate = startDateParam ? new Date(startDateParam) : null;

  const endDateParam = searchParams.get('endDate');
  const endDate = endDateParam ? new Date(endDateParam) : null;

  const statusParam = searchParams.get('status')?.split(',');
  const statusValue = {
    label: statusParam ? statusParam[0] : '',
    value: statusParam ? statusParam[1] : '',
  };

  const defaultSearchValues: AdminSearchFilterInterface = {
    search: searchParams.get('search') ?? initialValues?.search,
    dateRange: startDate && endDate ? [startDate, endDate] : undefined,
    status: searchParams.get('status') ? statusValue : initialValues?.status,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : initialValues?.page,
    paginationPerPage: searchParams.get('paginationPerPage')
      ? parseInt(searchParams.get('paginationPerPage')!, 10)
      : initialValues?.paginationPerPage,
  };

  const [filters, setFilters] = useState<AdminSearchFilterInterface>(defaultSearchValues);

  const queryClient = useQueryClient();
  const queryKey = 'managerlist';

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, { filters }],
    queryFn: () => adminService.list(filters),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: adminService.delete,
    onSuccess: (response) => {
      successToast(response?.message);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      handleClose();
    },
    onError(error) {
      errorToast(error?.message);
      handleClose();
    },
  });

  const addAdmin = useBoolean();
  const deleteAdmin = useBoolean();

  const methods = useForm({
    defaultValues: defaultSearchValues,
  });
  const { handleSubmit, reset, setValue } = methods;

  const handleOpenDeleteAdmin = (e: any, element: Admin) => {
    e.stopPropagation();
    deleteAdmin.onTrue();
    setSelectedAdmin(element);
  };

  const handleClose = () => {
    deleteAdmin.onFalse();
    addAdmin.onFalse();
    setSelectedAdmin(undefined);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      align: 'left',
      headerAlign: 'left',
      width: 250,
      renderCell: (params) => (
        <Typography sx={{ fontSize: '15px' }}>{params?.row?.name ?? '-'}</Typography>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      align: 'left',
      headerAlign: 'left',
      width: 300,
      renderCell: (params) => (
        <Typography sx={{ fontSize: '15px' }}>{params?.row?.email ?? '-'}</Typography>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Date Created',
      align: 'left',
      headerAlign: 'left',
      width: 160,
      renderCell: (params) => (
        <Typography sx={{ fontSize: '15px' }}>
          {params?.row?.createdAt ? format(new Date(params?.row?.createdAt), 'yyyy/MM/dd') : '-'}
        </Typography>
      ),
    },
    {
      sortable: false,
      field: 'status',
      headerName: 'Status',
      align: 'left',
      width: 150,
      headerAlign: 'left',
      renderCell: (params) => (
        <Button
          variant="outlined"
          sx={{
            fontSize: '12px',
            width: '78px',
            color: params?.row?.status ? '#04b573' : '#ee5c51',
            borderColor: params?.row?.status ? '#04b573' : '#ee5c51',
          }}
        >
          {params?.row?.status ? 'Active' : 'Inactive'}
        </Button>
      ),
    },
    {
      sortable: false,
      field: 'action',
      headerName: 'Action',
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => (
        <Button
          sx={{
            minWidth: '47px',
            border: 0,
            ':hover': {
              border: 0,
            },
            ':focus': {
              outline: 'none',
            },
          }}
          onClick={(e) => handleOpenDeleteAdmin(e, params.row)}
        >
          <DeleteIcon sx={{ fontSize: '24px' }} />
        </Button>
      ),
    },
  ];

  const handleSearchData = (result: AdminSearchFilterInterface) => {
    const searchFilter = {
      ...result,
    };

    const navigateSearchParams = new URLSearchParams();

    if (searchFilter.search) {
      navigateSearchParams.set('search', searchFilter.search);
    }

    if (searchFilter.dateRange && searchFilter.dateRange.length > 0) {
      const [first, second] = searchFilter.dateRange;
      navigateSearchParams.set('startDate', dayjs(first).format('YYYY-MM-DD'));
      navigateSearchParams.set('endDate', dayjs(second).format('YYYY-MM-DD'));
    }

    if (
      searchFilter.status &&
      searchFilter.status?.label.length > 0 &&
      searchFilter.status?.label !== ''
    ) {
      navigateSearchParams.set(
        'status',
        `${searchFilter.status?.label},${searchFilter.status?.value}`
      );
    }

    const searchString = navigateSearchParams.toString();
    router.push(`?${searchString}`);

    setFilters(searchFilter);
  };

  const onSubmit = handleSubmit(async (result) => {
    handleSearchData(result);
  });

  const handleResetFilters = () => {
    reset();
    setSelectedAdmin(undefined);
    handleSearchData(initialValues);
    setValue('dateRange', null);
  };

  const handleRemove = (
    name:
      | 'search'
      | 'dateRange'
      | 'status'
      | `dateRange.${string}`
      | 'status.label'
      | 'status.value'
  ) => {
    const defaultValues: any = defaultSearchValues;
    setValue(name, defaultValues[name]);
    const updatedValues: any = {
      ...filters,
    };

    if (name === 'dateRange') {
      setValue('dateRange', null);
    }

    updatedValues[name] = defaultValues[name];
    handleSearchData(updatedValues);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box>
          <PageTitle name="Manager" />
        </Box>
        <Box sx={{ pr: 2 }}>
          <MainDarkBtn
            name="Add Manager"
            iconName="mingcute:add-line"
            handleClick={addAdmin?.onTrue}
          />
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            mb: 2,
            p: '16px',
            position: 'relative',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            background: 'white',
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <AdminSearchFilter />
          </FormProvider>

          {(filters?.search && filters?.search?.length > 0) ||
          (filters?.status.label && filters?.status?.label.length > 0) ||
          (filters?.dateRange && filters?.dateRange?.length > 0) ? (
            <AdminFilterResult
              handleRemove={handleRemove}
              defaultSearchValues={defaultSearchValues}
              totalResults={data?.length ?? 0}
              values={filters}
              handleResetFilters={handleResetFilters}
            />
          ) : (
            ''
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
            p: 0,
            background: 'white',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
        >
          {isLoading || !data ? (
            <LinearProgressLoader />
          ) : (
            <MultiFunctionalTable
              columns={columns}
              rows={data?.docs}
              paginationPerPage={filters?.paginationPerPage}
              handlePaginationPerPageChange={handlePaginationPerPageChange}
              page={filters?.page}
              handlePageChange={handlePageChange}
              rowCount={data?.totalDocs}
              totalPages={data?.totalPages}
            />
          )}
        </Box>
      </Box>
      <CreateAdminModal open={addAdmin?.value} onClose={addAdmin.onFalse} />

      <DeleteModal
        title="Admin"
        open={deleteAdmin?.value}
        onClose={handleClose}
        isSubmitting={isPending}
        handleConfirm={() => {
          if (selectedAdmin?.email) {
            mutate(selectedAdmin?.email);
          }
        }}
      />
    </>
  );
};

export default ManagerPage;
