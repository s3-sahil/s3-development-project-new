import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const initialRows = [
  {
    id: 1,
    grade: "A",
    description: "APPRENTICE",
    voucher: "N",
    payType: "S",
    superAnnuation: "N",
    ot: "Y",
  },
  {
    id: 2,
    grade: "E",
    description: "MANAGING DIRECTOR",
    voucher: "N",
    payType: "S",
    superAnnuation: "N",
    ot: "N",
  },
];

export default function GradeWisePaymentDetailsTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredRows = initialRows.filter(
    (row) =>
      row.grade.toLowerCase().includes(search.toLowerCase()) ||
      row.description.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "voucher", headerName: "Voucher", flex: 1 },
    { field: "payType", headerName: "Pay Type", flex: 1 },
    {
      field: "superAnnuation",
      headerName: "Super Annuation Appl",
      flex: 1.5,
    },
    { field: "ot", headerName: "OT ALW", flex: 1 },
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
              navigate(`/material/payroll-grade-wise-payment-details-form/edit/${params.row.id}`)
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
      {/* Breadcrumb */}
      <Box mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "Master" }, { name: "Grade Details" }]}
        />
      </Box>

      <Stack elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight="bold">
            Grade Details
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/material/payroll-grade-wise-payment-details-form/add")}
          >
            New Grade
          </Button>
        </Box>

        {/* Search */}
        <Box mb={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by Grade or Description..."
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
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "14px",
            },
          }}
        />
      </Stack>
    </Container>
  );
}