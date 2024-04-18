import { format } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { formatDateFns } from 'src/utils/helperFunctions';

import adminService from 'src/services/adminService';

import PageTitle from 'src/components/typography/PageTitle';
import MainDarkBtn from 'src/components/buttons/MainDarkBtn';
import { LinearProgressLoader } from 'src/components/loader';
import FormProvider from 'src/components/hook-form/form-provider';
import AdminSearchFilter from 'src/components/search-filter/admin';
import CreateAdminModal from 'src/components/modal/admin/CreateAdminModal';
import DeleteAdminModal from 'src/components/modal/admin/DeleteAdminModal';
import MultiFunctionalTable from 'src/components/CommonTable/MultiFunctionalTable';
import AdminFilterResult from 'src/components/search-filter/admin/AdminFilterResult';

const defaultSearchValues: AdminSearchFilterInterface = {
  search: '',
  dateRange: undefined,
  status: {
    label: '',
    value: '',
  },
};

const ManagerPage = () => {
  const [filters, setFilters] = useState<AdminSearchFilterInterface>(defaultSearchValues);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin>();

  const { data, isLoading } = useQuery({
    queryKey: ['managerlist', { filters }],
    queryFn: () => adminService.list(filters),
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

  const onSubmit = handleSubmit(async (result) => {
    const searchFilter = {
      ...result,
      dateRange:
        result?.dateRange !== undefined && result?.dateRange !== null
          ? `${formatDateFns(result.dateRange[0])} へ ${formatDateFns(result.dateRange[1])}`
          : undefined,
    };

    setFilters(searchFilter);
  });

  const handleResetFilters = () => {
    reset();
    setSelectedAdmin(undefined);
    setFilters(defaultSearchValues);
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
    setFilters(updatedValues);
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
            <MultiFunctionalTable columns={columns} rows={data} />
          )}
        </Box>
      </Box>
      <CreateAdminModal open={addAdmin?.value} onClose={addAdmin.onFalse} />
      <DeleteAdminModal
        open={deleteAdmin?.value}
        onClose={handleClose}
        selectedAdmin={selectedAdmin}
      />
    </>
  );
};

export default ManagerPage;
