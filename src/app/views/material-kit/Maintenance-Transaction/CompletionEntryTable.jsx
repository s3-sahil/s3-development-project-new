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

export default function CompletionEntryTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("slipNo");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      slipNo: "BD001",
      machine: "Press Machine",
      date: "02/03/2026",
      actualReason: "Motor Failure",
      finishedAt: "11:00 AM",
      rootCause: "Improper Lubrication",
      completionStatus: "Completed",
      correctiveAction: "Replaced Motor",
      otherLabour: "2 Technicians",
      otherRepairs: "Bearing Replacement",
      serviceContract: "AMC Vendor",
    },
    {
      id: 2,
      slipNo: "BD002",
      machine: "CNC Machine",
      date: "01/03/2026",
      actualReason: "Scheduled Overhaul",
      finishedAt: "05:00 PM",
      rootCause: "Wear & Tear",
      completionStatus: "Completed",
      correctiveAction: "Overhaul Completed",
      otherLabour: "3 Technicians",
      otherRepairs: "Tool Replacement",
      serviceContract: "OEM Vendor",
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/maintenance-completion-entry-form/edit/${row.id}`, { state: row });
  };

  const handleAddNew = () => {
    navigate("/material/maintenance-completion-entry-form/add");
  };

  const columns = [
    { field: "slipNo", headerName: "Slip No", width: 150 },
    { field: "machine", headerName: "Machine", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "actualReason", headerName: "Actual Reason", width: 250 },
    { field: "finishedAt", headerName: "Finished At", width: 180 },
    { field: "rootCause", headerName: "Root Cause", width: 200 },
    { field: "completionStatus", headerName: "Completion Status", width: 200 },
    { field: "correctiveAction", headerName: "Corrective Action", width: 250 },
    { field: "otherLabour", headerName: "Other Labour", width: 200 },
    { field: "otherRepairs", headerName: "Other Repairs", width: 200 },
    { field: "serviceContract", headerName: "Service Contract", width: 200 },
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
        <Breadcrumb routeSegments={[{ name: "Maintenance" }, { name: "Completion Entry" }]} />
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
              <MenuItem value="actualReason">Actual Reason</MenuItem>
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