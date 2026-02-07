import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CostingTable() {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      costingNo: "COST001",
      customerName: "ABC Traders",
      productName: "Steel Rod",
      totalCost: 15000,
      date: "2026-02-04",
    },
  ]);

  const columns = [
    { field: "costingNo", headerName: "Costing No", flex: 1 },
    { field: "customerName", headerName: "Customer Name", flex: 1 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "totalCost", headerName: "Total Cost", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/sales-costing-form/edit/${params.row.id}`)
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

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
        <Breadcrumb routeSegments={[{ name: "Transaction" }, { name: "Costing" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/sales-costing-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
        </Box>
      </Stack>
    </Container>
  );
}