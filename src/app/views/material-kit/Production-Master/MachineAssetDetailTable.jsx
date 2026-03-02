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

export default function MachineAssetDetailTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("machineNo");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      machineNo: "M001",
      machineName: "Lathe Machine",
      modelNo: "LM-100",
      make: "ABC Corp",
      capacity: "5 Tons",
      inUse: true,
    },
    {
      id: 2,
      machineNo: "M002",
      machineName: "CNC Machine",
      modelNo: "CNC-200",
      make: "XYZ Ltd",
      capacity: "10 Tons",
      inUse: false,
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/production-machine-asset-detail-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleAddNew = () => {
    navigate("/material/production-machine-asset-detail-form/add");
  };

  const columns = [
    { field: "machineNo", headerName: "Machine No", width: 150 },
    { field: "machineName", headerName: "Machine Name", width: 200 },
    { field: "modelNo", headerName: "Model No", width: 150 },
    { field: "make", headerName: "Make", width: 180 },
    { field: "capacity", headerName: "Capacity", width: 150 },
    {
      field: "inUse",
      headerName: "In Use",
      width: 120,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
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
            { name: "Machine/Asset Details" },
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
              sx={{ width: 200 }}
            >
              <MenuItem value="machineNo">Machine No</MenuItem>
              <MenuItem value="machineName">Machine Name</MenuItem>
              <MenuItem value="modelNo">Model No</MenuItem>
              <MenuItem value="make">Make</MenuItem>
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