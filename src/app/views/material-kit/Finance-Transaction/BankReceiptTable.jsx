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

export default function BankReceiptTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, receiptType: "Cheque", customerCode: "CUST001", voucherNo: "BR001", voucherDate: "01/04/2025", bankCode: "BANK001", chequeAmt: "25000", chequeType: "Bearer", chequeNo: "CH001", chequeDate: "01/04/2025", custBank: "HDFC", narration: "Payment received", invoiceNo: "INV001" },
    { id: 2, receiptType: "NEFT", customerCode: "CUST002", voucherNo: "BR002", voucherDate: "02/04/2025", bankCode: "BANK002", chequeAmt: "50000", chequeType: "Transfer", chequeNo: "NEFT123", chequeDate: "02/04/2025", custBank: "ICICI", narration: "Advance received", invoiceNo: "INV002" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "receiptType", headerName: "Receipt Type", flex: 1 },
    { field: "customerCode", headerName: "Customer Code", flex: 1 },
    { field: "voucherNo", headerName: "Voucher No", flex: 1 },
    { field: "voucherDate", headerName: "Voucher Date", flex: 1 },
    { field: "bankCode", headerName: "Bank Code", flex: 1 },
    { field: "chequeAmt", headerName: "Cheque Amt", flex: 1 },
    { field: "chequeType", headerName: "Cheque Type", flex: 1 },
    { field: "chequeNo", headerName: "Cheque No", flex: 1 },
    { field: "chequeDate", headerName: "Cheque Date", flex: 1 },
    { field: "custBank", headerName: "Customer Bank", flex: 1 },
    { field: "narration", headerName: "Narration", flex: 1 },
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-bank-receipt-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Bank Requests" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-bank-receipt-form/add")}
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