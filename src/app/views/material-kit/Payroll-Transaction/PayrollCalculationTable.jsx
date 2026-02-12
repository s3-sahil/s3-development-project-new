import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";

export default function PayrollCalculationTable() {
  const navigate = useNavigate();

  // 🔹 Hardcoded Payroll Data
  const rows = [
    { id: 1, month: "04", year: "2016", division: "Consolidated", status: "Processed" },
    { id: 2, month: "05", year: "2016", division: "Particular", status: "Pending" },
    { id: 3, month: "06", year: "2016", division: "Consolidated", status: "Processed" },
  ];

  const handleEdit = (row) => {
    navigate(`/material/payroll-payroll-calculation-form/edit/${row.id}`, { state: row });
  };

  const handleDelete = (id) => {
    console.log("Delete record:", id);
  };

  const handleAddNew = () => {
    navigate("/material/payroll-payroll-calculation-form/add");
  };

  const columns = [
    { field: "month", headerName: "Month", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "division", headerName: "Division", width: 180 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Payroll" },
            { name: "Payroll Calculation" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 420, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}