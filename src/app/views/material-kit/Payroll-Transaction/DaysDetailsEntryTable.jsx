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

export default function DaysDetailsEntryTable() {
  const navigate = useNavigate();

  const rows = [
    { id: 1, employeeNo: "00105", period: "032022", miscEarning1: "-", miscEarning2: "-", remark: "-", division: "2" },
    { id: 2, employeeNo: "00106", period: "032022", miscEarning1: "-", miscEarning2: "-", remark: "-", division: "2" },
    { id: 3, employeeNo: "00109", period: "032022", miscEarning1: "-", miscEarning2: "-", remark: "-", division: "2" },
  ];

  const handleEdit = (row) => {
    navigate(`/material/payroll-days-details-entry-form/edit/${row.id}`, { state: row });
  };

  const handleDelete = (id) => {
    console.log("Delete record:", id);
  };

  const handleAddNew = () => {
    navigate("/material/payroll-days-details-entry-form/add");
  };

  const columns = [
    { field: "employeeNo", headerName: "Employee No", width: 150 },
    { field: "period", headerName: "Period", width: 150 },
    { field: "miscEarning1", headerName: "Misc Earning 1", width: 150 },
    { field: "miscEarning2", headerName: "Misc Earning 2", width: 150 },
    { field: "remark", headerName: "Remark", width: 180 },
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
            { name: "Days Details Entry" },
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