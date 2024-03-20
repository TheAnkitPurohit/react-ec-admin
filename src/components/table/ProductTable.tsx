import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataTableType {
  data: any;
  columns: GridColDef[];
}

const DataTable = ({ data, columns }: DataTableType) => (
  <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  </div>
);

export default DataTable;
