import {
  Box,
  Button,
  Container,
  Paper,
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
    date: "2018-01-26",
    description: "Republic Day",
    weeklyOff: "N",
    publicHoliday: "—",
  },
  {
    id: 2,
    date: "2018-08-15",
    description: "Independence Day",
    weeklyOff: "N",
    publicHoliday: "—",
  },
  {
    id: 3,
    date: "2018-11-05",
    description: "Diwali",
    weeklyOff: "N",
    publicHoliday: "—",
  },
];

export default function YearlyHolidayTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter(
    (row) =>
      row.description.toLowerCase().includes(search.toLowerCase()) ||
      row.date.includes(search)
  );

  const columns = [
    { field: "date", headerName: "Holiday Date", flex: 1.5 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "weeklyOff", headerName: "Weekly Off", flex: 1 },
    { field: "publicHoliday", headerName: "Public Holiday", flex: 1 },
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
              navigate(`/material/payroll-yearly-holiday-form/edit/${params.row.id}`)
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
          { name: "Master" },
          { name: "Yearly Holiday Details" },
        ]}
      />

      <Stack elevation={3} sx={{ p: 3, borderRadius: 2 }}>
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
            onClick={() => navigate("/material/payroll-yearly-holiday-form/add")}
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

        {/* Table */}
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