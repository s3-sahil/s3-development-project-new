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

export default function MachineProcessTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("machineCode");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      machineCode: "MC001",
      machineName: "Lathe Machine",
      process: "Cutting",
    },
    {
      id: 2,
      machineCode: "MC002",
      machineName: "Welding Machine",
      process: "Welding",
    },
    {
      id: 3,
      machineCode: "MC003",
      machineName: "Drill Machine",
      process: "Drilling",
    },
    {
      id: 4,
      machineCode: "MC004",
      machineName: "Inspection Machine",
      process: "Inspection",
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleEdit = (row) => {
    navigate(`/material/production-machine-process-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleAddNew = () => {
    navigate("/material/production-machine-process-form/add");
  };

  const columns = [
    { field: "machineCode", headerName: "Machine Code", width: 180 },
    { field: "machineName", headerName: "Machine Name", width: 250 },
    { field: "process", headerName: "Process", width: 200 },
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
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Machine Process Details" },
          ]}
        />
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
              sx={{ width: 180 }}
            >
              <MenuItem value="machineCode">Machine Code</MenuItem>
              <MenuItem value="machineName">Machine Name</MenuItem>
              <MenuItem value="process">Process</MenuItem>
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
