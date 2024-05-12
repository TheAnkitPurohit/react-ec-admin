import { DataGrid, GridRowIdGetter } from '@mui/x-data-grid';

import './table.css';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomTablePagination from './CustomTablePagination';

interface DatGridTypes {
  columns: any;
  rows: any;
  width?: string;
  handleEvent?: any;
  paginationPerPage: number;
  handlePaginationPerPageChange: (perPage: number) => void;
  page: number;
  handlePageChange: (page: number) => void;
  rowCount: number;
  totalPages: number;
}

export default function MultiFunctionalTable({
  columns,
  rows,
  width,
  handleEvent,
  paginationPerPage,
  page,
  handlePaginationPerPageChange,
  handlePageChange,
  rowCount,
  totalPages,
}: DatGridTypes) {
  const getRowId: GridRowIdGetter = (row) => row._id;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        checkboxSelection={false}
        onRowClick={handleEvent}
        rows={rows}
        columns={columns}
        getRowId={getRowId}
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
        rowSelection={false}
        pagination
        slots={{
          pagination: () => (
            <CustomTablePagination
              handlePageChange={handlePageChange}
              handlePaginationPerPageChange={handlePaginationPerPageChange}
              page={page}
              paginationPerPage={paginationPerPage}
              rowCount={rowCount ?? rows?.length}
              totalPages={totalPages}
            />
          ),
          noRowsOverlay: CustomNoRowsOverlay,
        }}
      />
    </div>
  );
}
