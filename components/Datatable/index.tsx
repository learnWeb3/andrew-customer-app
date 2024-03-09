import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

export interface DatatableProps {
  rows: any[];
  columns: GridColDef[];
  count: number;
  start: number;
  limit: number;
  pageSizeOptions?: number[];
  onPaginationChange?: (pagination: { pageSize: number; page: number }) => void;
}

export default function DataTable({
  columns = [],
  rows = [],
  count = 0,
  start = 0,
  limit = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onPaginationChange = (pagination) => {
    // console.log(pagination);
  },
}: DatatableProps) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              page: Math.ceil(count / limit),
              pageSize: limit,
            },
          },
        }}
        pageSizeOptions={pageSizeOptions}
        onPaginationModelChange={(model: GridPaginationModel) =>
          onPaginationChange({ pageSize: model.pageSize, page: model.page + 1 })
        }
      />
    </div>
  );
}
