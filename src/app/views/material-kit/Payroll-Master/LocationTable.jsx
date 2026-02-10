import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Breadcrumb } from "app/components";

const rows = [
  { id: 1, locationCode: 1, description: "Head Office", state: "Tamil Nadu" },
  { id: 2, locationCode: 2, description: "Factory Unit", state: "Karnataka" },
];

const columns = [
  { field: "locationCode", headerName: "Location Code", flex: 1 },
  { field: "description", headerName: "Location Description", flex: 2 },
  { field: "state", headerName: "State", flex: 1 },
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

export default function LocationTable() {
  return (
    <Container maxWidth="xl">
      <Breadcrumb
        routeSegments={[{ name: "Master" }, { name: "Location Details" }]}
      />
      <Box className="card" p={2}>
        <Box display="flex" gap={2} mb={2}>
          <TextField size="small" placeholder="Search..." />
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
