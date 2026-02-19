import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DeductionRecoveryTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const rows = [
    { id: 1, priority: 4, field: "ADVANCE_AMT", flag: "Y", carry: "N", gl: "NON" },
    { id: 2, priority: 7, field: "CANTEEN", flag: "Y", carry: "N", gl: "NON" },
    { id: 3, priority: "-", field: "D_REV_STAMP_DED", flag: "N", carry: "N", gl: "NON" },
    { id: 4, priority: 3, field: "ESI", flag: "Y", carry: "N", gl: "NON" },
    { id: 5, priority: 9, field: "HDFC_LOAN", flag: "Y", carry: "N", gl: "NON" },
    { id: 6, priority: 14, field: "ITAX", flag: "Y", carry: "N", gl: "NON" },
  ];

  const filteredRows = rows.filter((row) =>
    row.field.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { field: "priority", headerName: "Priority", width: 100 },
    { field: "field", headerName: "FIELD", width: 220 },
    { field: "flag", headerName: "Flag", width: 100 },
    { field: "carry", headerName: "Carry Forward", width: 150 },
    { field: "gl", headerName: "GL Code", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => navigate(`/material/payroll-deduction-recovery-form/edit/${params.row.id}`)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="purple">
          Deduction Recovery Method Entry
        </Typography>

        <Button
          variant="contained"
          startIcon={<Icon>add</Icon>}
          sx={{ backgroundColor: "#7b1fa2" }}
          onClick={() => navigate("/material/payroll-deduction-recovery-form/add")}
        >
          New
        </Button>
      </Box>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <TextField select size="small" defaultValue="field">
          <MenuItem value="field">Select Column</MenuItem>
        </TextField>

        <Button variant="contained" sx={{ backgroundColor: "#7b1fa2" }}>
          Search
        </Button>
      </Stack>

      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
        />
      </Box>
    </Container>
  );
}