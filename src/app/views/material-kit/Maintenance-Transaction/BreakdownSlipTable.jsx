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

export default function BreakdownSlipTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("slipNo");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      slipNo: "BD001",
      maintenanceType: "Breakdown",
      date: "02/03/2026",
      reason: "Motor Failure",
      machine: "Press Machine",
      breakdownDate: "02/03/2026",
      breakdownTime: "09:00 AM",
      reportedTime: "09:15 AM",
      reportedBy: "John Doe",
    },
    {
      id: 2,
      slipNo: "BD002",
      maintenanceType: "Shutdown",
      date: "01/03/2026",
      reason: "Scheduled Overhaul",
      machine: "CNC Machine",
      breakdownDate: "01/03/2026",
      breakdownTime: "02:00 PM",
      reportedTime: "02:10 PM",
      reportedBy: "Jane Smith",
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/maintenance-breakdown-slip-form/edit/${row.id}`, { state: row });
  };

  const handleAddNew = () => {
    navigate("/material/maintenance-breakdown-slip-form/add");
  };

  const columns = [
    { field: "slipNo", headerName: "Slip No", width: 150 },
    { field: "maintenanceType", headerName: "Maintenance Type", width: 180 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "reason", headerName: "Reason", width: 250 },
    { field: "machine", headerName: "Machine", width: 200 },
    { field: "breakdownDate", headerName: "Breakdown Date", width: 180 },
    { field: "breakdownTime", headerName: "Breakdown Time", width: 180 },
    { field: "reportedTime", headerName: "Reported Time", width: 180 },
    { field: "reportedBy", headerName: "Reported By", width: 200 },
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
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Breakdown Slip Entry" }]} />
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
              <MenuItem value="reason">Reason</MenuItem>
              <MenuItem value="reportedBy">Reported By</MenuItem>
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