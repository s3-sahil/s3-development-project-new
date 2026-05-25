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

export default function CashReceiptTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, receiptType: "Customer", partyCode: "CUST001", voucherNo: "CR001", voucherDate: "01/04/2025", invoiceNo: "INV001", invoiceDate: "01/04/2025", narration: "Payment received" },
    { id: 2, receiptType: "Supplier", partyCode: "SUP001", voucherNo: "CR002", voucherDate: "02/04/2025", invoiceNo: "INV002", invoiceDate: "02/04/2025", narration: "Advance received" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "receiptType", headerName: "Receipt Type", flex: 1 },
    { field: "partyCode", headerName: "Party Code", flex: 1 },
    { field: "voucherNo", headerName: "Voucher No", flex: 1 },
    { field: "voucherDate", headerName: "Voucher Date", flex: 1 },
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
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
                navigate(`/material/finance-cash-receipt-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Cash Receipt" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-cash-receipt-form/add")}
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