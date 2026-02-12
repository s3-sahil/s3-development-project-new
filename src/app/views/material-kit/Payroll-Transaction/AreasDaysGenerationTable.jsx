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

export default function AreasDaysGenerationTable() {
  const navigate = useNavigate();

  // 🔹 Hardcoded Data
  const rows = [
    { id: 1, employeeNo: "00052", period: "052013", arrearOT: "48", arrearDays: "30", month: "04/2013", division: "1" },
    { id: 2, employeeNo: "00066", period: "052013", arrearOT: "-", arrearDays: "30", month: "04/2013", division: "1" },
    { id: 3, employeeNo: "00109", period: "062013", arrearOT: "-", arrearDays: "6", month: "04/2013", division: "1" },
  ];

  const handleEdit = (row) => {
    navigate(`/material/payroll-areas-days-generation-form/edit/${row.id}`, { state: row });
  };

  const handleDelete = (id) => {
    console.log("Delete record:", id);
  };

  const handleAddNew = () => {
    navigate("/material/payroll-areas-days-generation-form/add");
  };

  const columns = [
    { field: "employeeNo", headerName: "Employee No", width: 150 },
    { field: "period", headerName: "Period", width: 150 },
    { field: "arrearOT", headerName: "Arrear OT", width: 150 },
    { field: "arrearDays", headerName: "Arrear Days", width: 150 },
    { field: "month", headerName: "Month", width: 150 },
    { field: "division", headerName: "Division", width: 120 },
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
            { name: "Arrears Days Generation Entry" },
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