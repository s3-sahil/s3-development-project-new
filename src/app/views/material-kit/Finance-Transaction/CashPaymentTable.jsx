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

export default function CashPaymentTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, paymentType: "Supplier", voucherNo: "V001", voucherDate: "01/04/2025", supplierCode: "SUP1001", narration: "Material Purchase", billNo: "B001", billDate: "01/04/2025", billAmt: "5000" },
    { id: 2, paymentType: "Expense", voucherNo: "V002", voucherDate: "02/04/2025", supplierCode: "SUP1002", narration: "Office Rent", billNo: "B002", billDate: "02/04/2025", billAmt: "10000" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "paymentType", headerName: "Payment Type", flex: 1 },
    { field: "voucherNo", headerName: "Voucher No", flex: 1 },
    { field: "voucherDate", headerName: "Voucher Date", flex: 1 },
    { field: "supplierCode", headerName: "Supplier Code", flex: 1 },
    { field: "narration", headerName: "Narration", flex: 1 },
    { field: "billNo", headerName: "Bill No", flex: 1 },
    { field: "billDate", headerName: "Bill Date", flex: 1 },
    { field: "billAmt", headerName: "Bill Amount", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-cash-payment-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Cash Payment" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-cash-payment-form/add")}
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