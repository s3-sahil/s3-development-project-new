import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PreventiveMaintenanceTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("preventiveReason");

  // 🔹 Example Data (UI Only)
  const rows = [
    { id: 1, preventiveReason: "Lubrication", machineGroup: "Press Machine", frequency: "Weekly", employee: "John Doe" },
    { id: 2, preventiveReason: "Inspection", machineGroup: "CNC Machine", frequency: "Monthly", employee: "Jane Smith" },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/maintenance-preventive-maintenance-form/edit/${row.id}`, { state: row });
  };

  const handleAddNew = () => {
    navigate("/material/maintenance-preventive-maintenance-form/add");
  };

  const columns = [
    { field: "preventiveReason", headerName: "Preventive Reason", width: 200 },
    { field: "machineGroup", headerName: "Machine / Group", width: 200 },
    { field: "frequency", headerName: "Frequency", width: 150 },
    { field: "employee", headerName: "Employee", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(params.row)}>
            <Icon color="primary">edit</Icon>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Preventive Scheduling" }]} />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <TextField
              select
              size="small"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              sx={{ width: 200 }}
            >
              <MenuItem value="preventiveReason">Preventive Reason</MenuItem>
              <MenuItem value="machineGroup">Machine / Group</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </TextField>

            <Button variant="contained">Search</Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        {/* DataGrid */}
        <Box sx={{ height: 450, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}