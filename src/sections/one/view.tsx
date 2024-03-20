import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import { Rating } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { GridColDef } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import productService from 'src/services/productService';

import CustomizedProgressBars from 'src/components/loader';
import { useSettingsContext } from 'src/components/settings';
import ProductTable from 'src/components/table/ProductTable';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProductList,
  });

  const ProductColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'category', headerName: 'category', width: 130 },
    { field: 'title', headerName: 'Title', width: 300 },
    {
      field: 'price',
      headerName: 'price',
      type: 'number',
      width: 90,
    },
    {
      field: 'rate',
      headerName: 'Rating',
      type: 'number',
      width: 180,
      renderCell: (params) => (
        <>
          <Rating name="half-rating" defaultValue={params?.row?.rating.rate || 0} precision={0.5} />
          <Typography sx={{ ml: 1 }}>{params?.row?.rating.rate || 0}</Typography>
        </>
      ),
    },
  ];

  if (isLoading) {
    return <CustomizedProgressBars />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Product Page </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          padding: '10px',
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <ProductTable data={data} columns={ProductColumns} />
      </Box>
    </Container>
  );
}
