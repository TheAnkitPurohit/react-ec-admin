import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { useBoolean } from 'src/hooks/use-boolean';

import categoryService from 'src/services/categoryService';

import PageTitle from 'src/components/typography/PageTitle';
import { LinearProgressLoader } from 'src/components/loader';
import MainDarkBtn from 'src/components/buttons/MainDarkBtn';
import FormProvider from 'src/components/hook-form/form-provider';
import CategorySearchFilter from 'src/components/search-filter/category';
import AddCategoryModal from 'src/components/modal/category/AddCategoryModal';
import MultiFunctionalTable from 'src/components/CommonTable/MultiFunctionalTable';
import CategoryFilterResult from 'src/components/search-filter/category/CategoryFilterResult';

// ----------------------------------------------------------------------

const defaultSearchValues: CategorySearchFilterInterface = {
  _id: '',
  name: '',
  order: undefined,
  dateRange: undefined,
  enabled: {
    label: '',
    value: undefined,
  },
};

const CategoryPage = () => {
  const [filters, setFilters] = useState<CategorySearchFilterInterface>(defaultSearchValues);
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const { data, isLoading } = useQuery({
    queryKey: ['categorylist', { filters }],
    queryFn: () => categoryService.list(filters),
  });

  const addModal = useBoolean();
  const deleteModal = useBoolean();

  const methods = useForm({
    defaultValues: defaultSearchValues,
  });
  const { handleSubmit, reset, setValue } = methods;

  const handleOpenCreateModal = () => {
    setSelectedCategory(undefined);
    addModal.onTrue();
  };

  const handleOpenEditModal = (params: any) => {
    setSelectedCategory(params.row);
    addModal.onTrue();
  };

  const handleOpenDeleteModal = (e: any, element: Category) => {
    e.stopPropagation();
    deleteModal.onTrue();
    setSelectedCategory(element);
  };

  const handleCloseModal = () => {
    addModal.onFalse();
    deleteModal.onFalse();
    setSelectedCategory(undefined);
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

  const onSubmit = handleSubmit(async (result) => {
    const searchFilter = {
      ...result,
    };

    setFilters(searchFilter);
  });

  const handleResetFilters = () => {
    reset();
    setSelectedCategory(undefined);
    setFilters(defaultSearchValues);
  };

  const handleRemove = (name: 'name' | 'enabled' | '_id' | 'order') => {
    const defaultValues: any = defaultSearchValues;
    setValue(name, defaultValues[name]);
    const updatedValues: any = {
      ...filters,
    };

    updatedValues[name] = defaultValues[name];
    setFilters(updatedValues);
  };

  console.log({ filters });

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
          <PageTitle name="Category" />
        </Box>
        <Box sx={{ pr: 2 }}>
          <MainDarkBtn
            name="Add Category"
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
            <CategorySearchFilter />
          </FormProvider>

          {(filters?.name && filters?.name?.length > 0) || filters?.enabled ? (
            <CategoryFilterResult
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
            <MultiFunctionalTable columns={columns} rows={data} handleEvent={handleOpenEditModal} />
          )}
        </Box>
      </Box>

      <AddCategoryModal
        open={addModal?.value}
        currentCagory={selectedCategory}
        onClose={handleCloseModal}
      />
      {/* <DeleteUserModal
        open={deleteUserModal.value}
        onClose={() => {
          setCurrentUser(undefined);
          deleteUserModal.onFalse();
        }}
        getFunction={handleResetFilters}
        currentUser={currentUser}
      /> */}
    </>
  );
};

export default CategoryPage;
