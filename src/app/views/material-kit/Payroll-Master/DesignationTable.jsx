import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Breadcrumb } from "app/components";

const rows = [
  { id: 1, code: "38", description: "ENGINEER", appointmentFlag: "Y" },
  { id: 2, code: "39", description: "SUPERVISOR", appointmentFlag: "N" },
];

const columns = [
  { field: "code", headerName: "Designation Code", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "appointmentFlag", headerName: "Appointment Letter Flag", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: () => (
      <>
        <IconButton color="primary">
          <EditIcon />
        </IconButton>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
];

export default function DesignationTable() {
  return (
    <Container maxWidth="xl">
      <Breadcrumb
        routeSegments={[{ name: "Master" }, { name: "Designation Details" }]}
      />

      <Box className="card" p={2}>
        <Box display="flex" gap={2} mb={2}>
          <TextField placeholder="Search..." size="small" />
          <Button variant="contained">Search</Button>
          <Box flexGrow={1} />
          <Button variant="contained" color="primary">
            New
          </Button>
        </Box>

        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>
    </Container>
  );
}
