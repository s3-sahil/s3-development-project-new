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

export default function CreditorsBillwiseEntryTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, subCode: "SUP001", voucherNo: "PV001", voucherDate: "2026-03-01", voucherType: "Purchase Voucher", invoiceNo: "INV001", invoiceDate: "2026-03-01", billAmt: "15000", balanceAmt: "5000", dueDate: "2026-03-15" },
    { id: 2, subCode: "SUP002", voucherNo: "PV002", voucherDate: "2026-03-02", voucherType: "Purchase Voucher", invoiceNo: "INV002", invoiceDate: "2026-03-02", billAmt: "20000", balanceAmt: "20000", dueDate: "2026-03-20" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "subCode", headerName: "Sub Code", flex: 1 },
    { field: "voucherNo", headerName: "Voucher No", flex: 1 },
    { field: "voucherDate", headerName: "Voucher Date", flex: 1 },
    { field: "voucherType", headerName: "Voucher Type", flex: 1 },
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
    { field: "billAmt", headerName: "Bill Amt", flex: 1 },
    { field: "balanceAmt", headerName: "Balance Amt", flex: 1 },
    { field: "dueDate", headerName: "Due Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/finance/creditors-billwise-entry-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Creditors Billwise Entry" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/finance/creditors-billwise-entry-form/add")}
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