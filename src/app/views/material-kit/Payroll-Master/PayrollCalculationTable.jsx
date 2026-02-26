import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const rows = [
  {
    id: 1,
    month: "April",
    year: "2024",
    division: "Consolidated",
    status: "Processed",
  },
  {
    id: 2,
    month: "May",
    year: "2024",
    division: "Particular",
    status: "Pending",
  },
];

export default function PayrollCalculationTables() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter(
    (row) =>
      row.month.toLowerCase().includes(search.toLowerCase()) ||
      row.year.includes(search) ||
      row.division.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "month", headerName: "Month", flex: 1 },
    { field: "year", headerName: "Year", flex: 1 },
    { field: "division", headerName: "Division", flex: 1.5 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() =>
              navigate(`/material/payroll-payroll-calculations-form/edit/${params.row.id}`)
            }
          >
            <EditIcon />
          </IconButton>

          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Breadcrumb
        routeSegments={[
          { name: "Payroll" },
          { name: "Payroll Calculation" },
        ]}
      />

      <Stack sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold" color="#7b1fa2">
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ background: "#7b1fa2" }}
            onClick={() => navigate("/material/payroll-payroll-calculations-form/add")}
          >
            New
          </Button>
        </Box>

        {/* Search */}
        <Box mb={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* DataGrid */}
        <DataGrid
          autoHeight
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
          }}
        />
      </Stack>
    </Container>
  );
}