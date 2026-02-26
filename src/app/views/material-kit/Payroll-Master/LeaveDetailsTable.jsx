import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const rows = [
  {
    id: 1,
    empNo: "00165",
    period: "2022",
    division: "2",
    casualTaken: "-",
    sickTaken: "-",
  },
  {
    id: 2,
    empNo: "00171",
    period: "2022",
    division: "2",
    casualTaken: "-",
    sickTaken: "-",
  },
  {
    id: 3,
    empNo: "00197",
    period: "2022",
    division: "2",
    casualTaken: "-",
    sickTaken: "-",
  },
];

export default function LeaveDetailsTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter(
    (row) => row.empNo.includes(search) || row.period.includes(search),
  );

  const columns = [
    { field: "empNo", headerName: "Employee No", flex: 1 },
    { field: "period", headerName: "Period", flex: 1 },
    { field: "division", headerName: "Division", flex: 1 },
    { field: "casualTaken", headerName: "Casual Leave Taken", flex: 1.5 },
    { field: "sickTaken", headerName: "Sick Leave Taken", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() =>
            navigate(`/material/payroll-leave-details-form/edit/${params.row.id}`)
          }
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Breadcrumb
        routeSegments={[{ name: "Master" }, { name: "Leave Details" }]}
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
            onClick={() => navigate("/material/payroll-leave-details-form/add")}
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
