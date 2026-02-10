import { Box, Button, Container, IconButton, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Breadcrumb } from "app/components";

const rows = [
  { id: 1, grade: "A", description: "APPRENTICE", voucher: "N", payType: "S", superAnnuation: "N", ot: "Y" },
  { id: 2, grade: "E", description: "MANAGING DIRECTOR", voucher: "N", payType: "S", superAnnuation: "N", ot: "N" },
];

const columns = [
  { field: "grade", headerName: "Grade", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "voucher", headerName: "Voucher", flex: 1 },
  { field: "payType", headerName: "Pay Type", flex: 1 },
  { field: "superAnnuation", headerName: "Super Annuation Appl", flex: 1 },
  { field: "ot", headerName: "OT ALW", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: () => (
      <>
        <IconButton color="primary"><EditIcon /></IconButton>
        <IconButton color="error"><DeleteIcon /></IconButton>
      </>
    ),
  },
];

export default function GradeTable() {
  return (
    <Container maxWidth="xl">
      <Breadcrumb routeSegments={[{ name: "Master"} ,{ name: "Grade Details" }]} />

      <Box className="card" p={2}>
        <Box display="flex" gap={2} mb={2}>
          <TextField placeholder="Search..." size="small" />
          <Button variant="contained">Search</Button>
          <Box flexGrow={1} />
          <Button variant="contained" color="primary">New</Button>
        </Box>

        <DataGrid autoHeight rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10, 20, 50]} />
      </Box>
    </Container>
  );
}