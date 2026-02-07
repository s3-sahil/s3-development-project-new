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

export default function PreShipmentPackingslipTable() {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      slipNo: "PS-001",
      customerName: "AAA PVT LTD",
      slipDate: "2026-02-04",
      orderNo: "ORD-1001",
      quantity: 120,
      status: "Created",
    },
    {
      id: 2,
      slipNo: "PS-002",
      customerName: "RRR PVT LTD",
      slipDate: "2026-02-05",
      orderNo: "ORD-1002",
      quantity: 80,
      status: "Dispatched",
    },
  ]);

  const columns = [
    { field: "slipNo", headerName: "Slip No", flex: 1 },
    { field: "customerName", headerName: "Customer", flex: 1.5 },
    { field: "slipDate", headerName: "Date", flex: 1 },
    { field: "orderNo", headerName: "Order No", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
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
                navigate(`/sales/pre-shipment-packingslip-form/edit/${params.row.id}`)
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
        <Breadcrumb
          routeSegments={[{ name: "SALES" }, { name: "PRE Shipment Packingslip" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/sales/pre-shipment-packingslip-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}