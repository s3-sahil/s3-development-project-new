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

export default function UploadEInvoiceTable() {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      invoiceNo: "INV001",
      customerName: "XYZ Pvt Ltd",
      invoiceDate: "2026-02-04",
      amount: 25000,
      status: "Uploaded",
    },
  ]);

  const columns = [
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    { field: "customerName", headerName: "Customer Name", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton
              onClick={() =>
                navigate(`/material/sales-upload-e-invoice-form/edit/${params.row.id}`)
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
          routeSegments={[{ name: "E-Invoice" }, { name: "Upload" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/sales-upload-e-invoice-form/add")}
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