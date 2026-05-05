import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UOMPaginationAPI } from "app/utils/materialMaterialServices";

export default function UOMTable() {
  const navigate = useNavigate();

  // ✅ State
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // DataGrid starts from 0
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Columns
  const columns = [
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "desc", headerName: "UOM Description", width: 220 },
    {
      field: "decimal",
      headerName: "Decimal Applicable",
      width: 180,
      renderCell: (params) => (params.value ? "Y" : "N"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 160,
      renderCell: (params) => (
        <>
          {/* Edit */}
          {/* <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/Unit-Of-Management-form/edit/${params.row.id}`,
                  { state: params.row },
                )
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip> */}

          {/* Delete */}
          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/Unit-Of-Management-form/delete/${params.row.id}`,
                  { state: { ...params.row, mode: "delete" } },
                )
              }
            >
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  // ✅ Fetch API Data
  const fetchUOMData = async () => {
    setLoading(true);

    const res = await UOMPaginationAPI(page + 1, pageSize);

    if (res?.Data) {
      const formattedRows = res.Data.map((item, index) => ({
        id: item.UOM || index + 1 + page * pageSize, // better ID
        uom: item.UOM,
        desc: item.uom_desc,
        decimal: item.deci_flag === "Y",
      }));

      setRows(formattedRows);
      setRowCount(res.TotalCount);
    }

    setLoading(false);
  };

  // ✅ Call API on page change
  useEffect(() => {
    fetchUOMData();
  }, [page, pageSize]);

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Material" }, { name: "Unit Of Management" }]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Actions */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/Unit-Of-Management-form/add")}
          >
            New
          </Button>
        </Box>

        {/* DataGrid */}
        <Box sx={{ height: 420 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            paginationMode="server" // 🔥 important
            rowCount={rowCount}
            page={page}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newSize) => setPageSize(newSize)}
            rowsPerPageOptions={[5, 10, 20]}
            loading={loading}
          />
        </Box>
      </Stack>
    </Container>
  );
}
