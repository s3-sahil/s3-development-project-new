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

export default function PreventiveSlipTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("slipNo");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      slipNo: "PS001",
      maintenanceType: "Preventive",
      machine: "Riveting Machine",
      preventiveReason: "Reset Start Button",
      startAt: "09:00 AM",
      date: "02/03/2026",
      remark: "Routine check",
    },
    {
      id: 2,
      slipNo: "PS002",
      maintenanceType: "Periodic Overhauling",
      machine: "CNC Machine",
      preventiveReason: "Tool Overhaul",
      startAt: "02:00 PM",
      date: "01/03/2026",
      remark: "Scheduled overhaul",
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/maintenance-preventive-slip-form/edit/${row.id}`, { state: row });
  };

  const handleAddNew = () => {
    navigate("/material/maintenance-preventive-slip-form/add");
  };

  const columns = [
    { field: "slipNo", headerName: "Slip No", width: 150 },
    { field: "maintenanceType", headerName: "Maintenance Type", width: 200 },
    { field: "machine", headerName: "Machine", width: 200 },
    { field: "preventiveReason", headerName: "Preventive Reason", width: 250 },
    { field: "startAt", headerName: "Start At", width: 180 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "remark", headerName: "Remark", width: 250 },
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
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Preventive Slip Entry" }]} />
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
              <MenuItem value="slipNo">Slip No</MenuItem>
              <MenuItem value="machine">Machine</MenuItem>
              <MenuItem value="preventiveReason">Preventive Reason</MenuItem>
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