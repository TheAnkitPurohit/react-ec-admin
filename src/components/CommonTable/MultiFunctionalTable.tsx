import { Box } from '@mui/material';
import { DataGrid, GridRowIdGetter } from '@mui/x-data-grid';

import './table.css';

interface DatGridTypes {
  columns: any;
  rows: any;
  width?: string;
  handleEvent?: any;
}

export default function MultiFunctionalTable({ columns, rows, width, handleEvent }: DatGridTypes) {
  const getRowId: GridRowIdGetter = (row) => row._id;

  return (
    <DataGrid
      checkboxSelection={false}
      onRowClick={handleEvent}
      rows={rows}
      columns={columns}
      getRowId={getRowId}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          background: 'white !important',
        },
        '& .MuiDataGrid-columnHeader': {
          background: 'white !important',
          width: '100%',
        },
        '& .MuiDataGrid-columnHeaderRow': {
          width: '100% !important',
          background: 'white !important',
        },
      }}
      componentsProps={{
        pagination: {
          labelRowsPerPage: '件数',
        },
      }}
      pageSizeOptions={[5, 10]}
      rowSelection={false}
      components={{
        NoRowsOverlay: () => (
          <Box alignItems="center" justifyContent="center" style={{ height: '100%' }}>
            データなし
          </Box>
        ),
      }}
    />
  );
}
