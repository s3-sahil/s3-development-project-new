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

export default function SparesConsumptionTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("item");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      maintenanceType: "Preventive",
      item: "Bearing",
      quantityUsed: 2,
    },
    {
      id: 2,
      maintenanceType: "Breakdown",
      item: "Lubricant",
      quantityUsed: 5,
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/maintenance-spares-consumption-form/edit/${row.id}`, { state: row });
  };

  const handleAddNew = () => {
    navigate("/material/maintenance-spares-consumption-form/add");
  };

  const columns = [
    { field: "maintenanceType", headerName: "Maintenance Type", width: 200 },
    { field: "item", headerName: "Item", width: 250 },
    { field: "quantityUsed", headerName: "Quantity Used", width: 180 },
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
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Spares Consumption" }]} />
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
              <MenuItem value="item">Item</MenuItem>
              <MenuItem value="maintenanceType">Maintenance Type</MenuItem>
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