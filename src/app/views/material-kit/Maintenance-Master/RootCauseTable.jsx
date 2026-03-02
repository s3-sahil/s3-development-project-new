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

export default function RootCauseTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("rootCauseCode");

  // 🔹 Example Data (UI Only)
  const rows = [
    { id: 1, rootCauseCode: "RC01", rootCause: "Improper Lubrication" },
    { id: 2, rootCauseCode: "RC02", rootCause: "Operator Error" },
    { id: 3, rootCauseCode: "RC03", rootCause: "Material Defect" },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/maintenance-root-cause-form/edit/${row.id}`, { state: row });
  };

  const handleAddNew = () => {
    navigate("/material/maintenance-root-cause-form/add");
  };

  const columns = [
    { field: "rootCauseCode", headerName: "Root Cause Code", width: 200 },
    { field: "rootCause", headerName: "Root Cause", width: 400 },
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
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Root Cause Details" }]} />
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
              <MenuItem value="rootCauseCode">Root Cause Code</MenuItem>
              <MenuItem value="rootCause">Root Cause</MenuItem>
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