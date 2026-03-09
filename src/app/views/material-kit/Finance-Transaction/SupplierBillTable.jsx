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

export default function SupplierBillTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, supplierCode: "SUP001", docNo: "DOC001", poNo: "PO001", invoiceNo: "INV001", invoiceDate: "01/04/2025", billAmount: "15000", cgst: "750", sgst: "750", igst: "0", narration: "Purchase of raw material" },
    { id: 2, supplierCode: "SUP002", docNo: "DOC002", poNo: "PO002", invoiceNo: "INV002", invoiceDate: "02/04/2025", billAmount: "20000", cgst: "1000", sgst: "1000", igst: "0", narration: "Office supplies" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "supplierCode", headerName: "Supplier Code", flex: 1 },
    { field: "docNo", headerName: "Doc No", flex: 1 },
    { field: "poNo", headerName: "PO No", flex: 1 },
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
    { field: "billAmount", headerName: "Bill Amount", flex: 1 },
    { field: "cgst", headerName: "CGST", flex: 1 },
    { field: "sgst", headerName: "SGST", flex: 1 },
    { field: "igst", headerName: "IGST", flex: 1 },
    { field: "narration", headerName: "Narration", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-supplier-bill-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Supplier Bills" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-supplier-bill-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500 }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10]} />
        </Box>
      </Stack>
    </Container>
  );
}