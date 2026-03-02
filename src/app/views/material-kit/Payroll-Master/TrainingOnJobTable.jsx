import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Stack,
  Icon,
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
    employee: "John Doe",
    activity: "Machine Operation",
    fromDate: "2024-01-01",
    toDate: "2024-01-10",
    trainer: "Senior Trainer",
    status: "Completed",
  },
  {
    id: 2,
    employee: "Jane Smith",
    activity: "Safety Training",
    fromDate: "2024-02-01",
    toDate: "2024-02-15",
    trainer: "HR Manager",
    status: "Ongoing",
  },
];

export default function TrainingOnJobTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter(
    (row) =>
      row.employee.toLowerCase().includes(search.toLowerCase()) ||
      row.activity.toLowerCase().includes(search.toLowerCase()) ||
      row.status.toLowerCase().includes(search.toLowerCase()),
  );

  const columns = [
    { field: "employee", headerName: "Employee", flex: 1.5 },
    { field: "activity", headerName: "Training Activity", flex: 1.5 },
    { field: "fromDate", headerName: "From Date", flex: 1 },
    { field: "toDate", headerName: "To Date", flex: 1 },
    { field: "trainer", headerName: "Trainer", flex: 1.5 },
    { field: "status", headerName: "Completion Status", flex: 1.2 },
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
              navigate(
                `/material/payroll-training-on-job-form/edit/${params.row.id}`,
              )
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
        routeSegments={[{ name: "Master" }, { name: "Training On Job" }]}
      />

      <Stack>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#7b1fa2"
          ></Typography>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/payroll-training-on-job-form/add")
            }
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
