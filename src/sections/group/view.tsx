import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import useToaster from 'src/hooks/use-toaster';
import { useBoolean } from 'src/hooks/use-boolean';
import usePagination from 'src/hooks/use-pagination';

import groupService from 'src/services/groupService';

import PageTitle from 'src/components/typography/PageTitle';
import { LinearProgressLoader } from 'src/components/loader';
import MainDarkBtn from 'src/components/buttons/MainDarkBtn';
import FormProvider from 'src/components/hook-form/form-provider';
import DeleteModal from 'src/components/modal/common/DeleteModal';
import AddGroupModal from 'src/components/modal/group/AddGroupModal';
import GroupSearchFilter from 'src/components/search-filter/category';
import MultiFunctionalTable from 'src/components/CommonTable/MultiFunctionalTable';
import GroupFilterResult from 'src/components/search-filter/category/CategoryFilterResult';

// ----------------------------------------------------------------------

const GroupPage = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group>();

  const searchParams = useSearchParams();
  const router = useRouter();
  const { initialPaginationValues, handleNavigationPage, handleNavigationPaginationPerPage } =
    usePagination();
  const { errorToast, successToast } = useToaster();

  const initialValues: GroupSearchFilterInterface = {
    name: '',
    order: undefined,
    dateRange: undefined,
    enabled: {
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

  const enabledParam = searchParams.get('enabled')?.split(',');
  const enabledValue = {
    label: enabledParam ? enabledParam[0] : '',
    value: enabledParam ? enabledParam[1] : '',
  };

  const defaultSearchValues: CategorySearchFilterInterface = {
    name: searchParams.get('name') ?? initialValues?.name,
    order: searchParams.get('order') ? Number(searchParams.get('order')) : initialValues?.order,
    dateRange: startDate && endDate ? [startDate, endDate] : undefined,
    enabled: searchParams.get('enabled') ? enabledValue : initialValues?.enabled,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : initialValues?.page,
    paginationPerPage: searchParams.get('paginationPerPage')
      ? parseInt(searchParams.get('paginationPerPage')!, 10)
      : initialValues?.paginationPerPage,
  };

  const [filters, setFilters] = useState<CategorySearchFilterInterface>(defaultSearchValues);

  const queryClient = useQueryClient();
  const queryKey = 'grouplist';

  const { data, isLoading } = useQuery({
    queryKey: [queryKey, { filters }],
    queryFn: () => groupService.list(filters),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: groupService.delete,
    onSuccess: (response) => {
      successToast(response?.message);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      handleCloseModal();
    },
    onError(error) {
      errorToast(error?.message);
      handleCloseModal();
    },
  });

  const addModal = useBoolean();
  const deleteModal = useBoolean();

  const methods = useForm({
    defaultValues: defaultSearchValues,
  });
  const { handleSubmit, reset, setValue } = methods;

  const handleOpenCreateModal = () => {
    setSelectedGroup(undefined);
    addModal.onTrue();
  };

  const handleOpenEditModal = (params: any) => {
    setSelectedGroup(params.row);
    addModal.onTrue();
  };
  const handleOpenDeleteModal = (e: any, element: Category) => {
    e.stopPropagation();
    deleteModal.onTrue();
    setSelectedGroup(element);
  };

  const handleCloseModal = () => {
    addModal.onFalse();
    deleteModal.onFalse();
    setSelectedGroup(undefined);
  };

  const columns: GridColDef[] = [
    {
      field: '_id',
      width: 250,
      headerName: 'Id',
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => (
        <Typography sx={{ fontSize: '15px' }}>
          {params?.row?._id ? params?.row?._id : '-'}
        </Typography>
      ),
    },
    {
      field: 'name',
      width: 200,
      headerName: 'Name',
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => (
        <Typography sx={{ fontSize: '15px' }}>{params?.row?.name ?? '-'}</Typography>
      ),
    },
    {
      field: 'order',
      width: 50,
      headerName: 'Order',
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => (
        <Typography sx={{ fontSize: '15px' }}>{params?.row?.order ?? '-'}</Typography>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      align: 'left',
      headerAlign: 'left',
      width: 180,
      renderCell: (params) => (
        <Typography sx={{ fontSize: '15px' }}>
          {params?.row?.createdAt ? dayjs(params?.row?.createdAt).format('YYYY-MM-DD') : '-'}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      align: 'left',
      headerAlign: 'left',
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          sx={{
            fontSize: '12px',
            width: '78px',
            color: params?.row?.enabled ? '#04b573' : '#ee5c51',
            borderColor: params?.row?.enabled ? '#04b573' : '#ee5c51',
          }}
        >
          {params?.row?.enabled ? 'Active' : 'Inactive'}
        </Button>
      ),
    },

    {
      field: 'delete',
      headerName: 'Action',
      align: 'left',
      headerAlign: 'left',
      sortable: false,
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
          onClick={(e) => handleOpenDeleteModal(e, params.row)}
        >
          <DeleteIcon sx={{ fontSize: '24px' }} />
        </Button>
      ),
    },
  ];
  const handleSearchData = (result: CategorySearchFilterInterface) => {
    const searchFilter = {
      ...result,
    };

    const navigateSearchParams = new URLSearchParams();

    if (searchFilter.name) {
      navigateSearchParams.set('name', searchFilter.name);
    }

    if (searchFilter.order) {
      navigateSearchParams.set('order', String(searchFilter.order));
    }

    if (searchFilter.dateRange && searchFilter.dateRange.length > 0) {
      const [first, second] = searchFilter.dateRange;
      navigateSearchParams.set('startDate', dayjs(first).format('YYYY-MM-DD'));
      navigateSearchParams.set('endDate', dayjs(second).format('YYYY-MM-DD'));
    }

    if (
      searchFilter.enabled &&
      searchFilter.enabled?.label.length > 0 &&
      searchFilter.enabled?.label !== ''
    ) {
      navigateSearchParams.set(
        'enabled',
        `${searchFilter.enabled?.label},${searchFilter.enabled?.value}`
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
    setSelectedGroup(undefined);
    handleSearchData(initialValues);
    setValue('dateRange', null);
  };

  const handleRemove = (
    name:
      | 'name'
      | 'order'
      | 'enabled'
      | 'dateRange'
      | `dateRange.${string}`
      | 'enabled.label'
      | 'enabled.value'
  ) => {
    const defaultValues: any = initialValues;
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
          <PageTitle name="Group" />
        </Box>
        <Box sx={{ pr: 2 }}>
          <MainDarkBtn
            name="Add Group"
            handleClick={handleOpenCreateModal}
            iconName="mingcute:add-line"
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
            background: 'white !important',
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <GroupSearchFilter />
          </FormProvider>

          {(filters?.name && filters?.name?.length > 0) ||
          (filters?.order && filters?.order > 0) ||
          (filters?.enabled.label && filters?.enabled?.label.length > 0) ||
          (filters?.dateRange && filters?.dateRange?.length > 0) ? (
            <GroupFilterResult
              handleRemove={handleRemove}
              defaultSearchValues={initialValues}
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
              handleEvent={handleOpenEditModal}
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

      <AddGroupModal
        open={addModal?.value}
        currentGroup={selectedGroup}
        onClose={handleCloseModal}
      />

      <DeleteModal
        title="Group"
        open={deleteModal.value}
        onClose={handleCloseModal}
        isSubmitting={isPending}
        handleConfirm={() => {
          if (selectedGroup?._id) {
            mutate(selectedGroup?._id);
          }
        }}
      />
    </>
  );
};

export default GroupPage;
