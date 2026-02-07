import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BusinessPlanTable() {
  const navigate = useNavigate();

  const [rows] = useState([
    { id: 1, empNo: "00001", cardNumber: "1" },
    { id: 2, empNo: "00100", cardNumber: "100" },
    { id: 3, empNo: "00101", cardNumber: "101" },
    { id: 4, empNo: "00103", cardNumber: "103" },
    { id: 5, empNo: "00105", cardNumber: "105" },
  ]);

  const columns = [
    { field: "empNo", headerName: "Emp No", flex: 1 },
    { field: "cardNumber", headerName: "Card Number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: () => (
        <>
          <Tooltip title="Delete">
            <IconButton>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Business Plan" }]} />
      </Box>

      <Stack spacing={3}>
        {/* Search Bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={2}>
            <TextField size="small" placeholder="Search..." />
            <TextField size="small" placeholder="Select Column" />
            <Button variant="contained">Search</Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/planning/business-plan/add")}
          >
            New
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}