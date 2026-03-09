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

export default function BillPassingTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, voucherType: "Purchase", voucherNo: "BP001", supplierCode: "SUP001", grnNo: "GRN001", invoiceNo: "INV001", invoiceDate: "01/04/2025", invoiceAmt: "5000", narration: "Material purchase" },
    { id: 2, voucherType: "Expense", voucherNo: "BP002", supplierCode: "SUP002", grnNo: "GRN002", invoiceNo: "INV002", invoiceDate: "02/04/2025", invoiceAmt: "10000", narration: "Office rent" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "voucherType", headerName: "Voucher Type", flex: 1 },
    { field: "voucherNo", headerName: "Voucher No", flex: 1 },
    { field: "supplierCode", headerName: "Supplier Code", flex: 1 },
    { field: "grnNo", headerName: "GRN No", flex: 1 },
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
    { field: "invoiceAmt", headerName: "Invoice Amount", flex: 1 },
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
                navigate(`/material/finance-bill-passing-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Bill Passing" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-bill-passing-form/add")}
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