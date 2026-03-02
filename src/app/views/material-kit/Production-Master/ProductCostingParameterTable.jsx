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

export default function ProductCostingParameterTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("unloading");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      unloading: "5",
      systems: "2",
      followUp: "1",
      administrative: "10",
      financialInterest: "8",
      sellingDistribution: "12",
      nonCostItem: "3",
      profit: "15",
      rejection: "2",
      operationEfficiency: "90",
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/production-product-costing-parameter-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleAddNew = () => {
    navigate("/material/production-product-costing-parameter-form/add");
  };

  const columns = [
    { field: "unloading", headerName: "Unloading %", width: 120 },
    { field: "systems", headerName: "Systems %", width: 120 },
    { field: "followUp", headerName: "Follow Up %", width: 120 },
    { field: "administrative", headerName: "Administrative %", width: 150 },
    { field: "financialInterest", headerName: "Financial Interest %", width: 180 },
    { field: "sellingDistribution", headerName: "Selling & Distribution %", width: 200 },
    { field: "nonCostItem", headerName: "Non-Cost Item %", width: 150 },
    { field: "profit", headerName: "Profit %", width: 120 },
    { field: "rejection", headerName: "Rejection %", width: 120 },
    { field: "operationEfficiency", headerName: "Operation Efficiency %", width: 200 },
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
            { name: "Product Costing Parameters" },
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
              <MenuItem value="unloading">Unloading %</MenuItem>
              <MenuItem value="systems">Systems %</MenuItem>
              <MenuItem value="followUp">Follow Up %</MenuItem>
              <MenuItem value="administrative">Administrative %</MenuItem>
              <MenuItem value="profit">Profit %</MenuItem>
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