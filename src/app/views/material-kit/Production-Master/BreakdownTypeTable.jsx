// BreakdownTypeTable.js
import {
    Box,
    Button,
    Container,
    Icon,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BreakdownTypeTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("appointmentNo");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      appointmentNo: "AP001",
      representing: "Vendor A",
      visitorName: "John Doe",
      visitingPerson: "Manager X",
      appointmentDate: "2026-02-27",
      appointmentTime: "10:30 AM",
      purpose: "Machine Inspection",
    },
    {
      id: 2,
      appointmentNo: "AP002",
      representing: "Supplier B",
      visitorName: "Jane Smith",
      visitingPerson: "Supervisor Y",
      appointmentDate: "2026-02-28",
      appointmentTime: "02:00 PM",
      purpose: "Breakdown Review",
    },
  ];

  // 🔹 Filtering logic
  const filteredRows = rows.filter((row) =>
    row[searchField]?.toLowerCase().includes(searchText.toLowerCase()),
  );

  // 🔹 Navigation handlers
  const handleEdit = (row) => {
    navigate(`/material/production-breakdown-type-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleAddNew = () => {
    navigate("/material/production-breakdown-type-form/add");
  };

  // 🔹 DataGrid columns
  const columns = [
    { field: "appointmentNo", headerName: "Appointment No", width: 150 },
    { field: "representing", headerName: "Representing", width: 200 },
    { field: "visitorName", headerName: "Visitor Name", width: 200 },
    { field: "visitingPerson", headerName: "Visiting Person", width: 200 },
    { field: "appointmentDate", headerName: "Appointment Date", width: 180 },
    { field: "appointmentTime", headerName: "Appointment Time", width: 160 },
    { field: "purpose", headerName: "Purpose", width: 250 },
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
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Maintenance" },
            { name: "Breakdown Type Details" },
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
              <MenuItem value="appointmentNo">Appointment No</MenuItem>
              <MenuItem value="representing">Representing</MenuItem>
              <MenuItem value="visitorName">Visitor Name</MenuItem>
              <MenuItem value="visitingPerson">Visiting Person</MenuItem>
              <MenuItem value="purpose">Purpose</MenuItem>
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
