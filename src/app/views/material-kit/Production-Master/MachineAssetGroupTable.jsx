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

export default function MachineAssetGroupTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("groupCode");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      type: "Machine",
      groupCode: "GR001",
      groupName: "Lathe Machines",
      machineHrRate: "500",
      machineCount: "10",
    },
    {
      id: 2,
      type: "Non-Machine",
      groupCode: "GR002",
      groupName: "Tools",
      machineHrRate: "100",
      machineCount: "50",
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/production-machine-asset-group-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleAddNew = () => {
    navigate("/material/production-machine-asset-group-form/add");
  };

  const columns = [
    { field: "type", headerName: "Type", width: 150 },
    { field: "groupCode", headerName: "Group Code", width: 150 },
    { field: "groupName", headerName: "Group Name", width: 200 },
    { field: "machineHrRate", headerName: "Machine Hr. Rate", width: 180 },
    { field: "machineCount", headerName: "Machine Count", width: 180 },
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
            { name: "Machine/Asset Group Details" },
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
              <MenuItem value="groupCode">Group Code</MenuItem>
              <MenuItem value="groupName">Group Name</MenuItem>
              <MenuItem value="type">Type</MenuItem>
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