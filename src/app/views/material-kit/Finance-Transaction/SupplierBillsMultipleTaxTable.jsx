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

export default function SupplierBillsMultipleTaxTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, billType: "Other", supplierCode: "SUP001", docNo: "DOC001", invoiceNo: "INV001", invoiceDate: "01/04/2025", billAmount: "15000", cgstAmt: "750", sgstAmt: "750", igstAmt: "0", narration: "Miscellaneous expense" },
    { id: 2, billType: "Other", supplierCode: "SUP002", docNo: "DOC002", invoiceNo: "INV002", invoiceDate: "02/04/2025", billAmount: "20000", cgstAmt: "1000", sgstAmt: "1000", igstAmt: "0", narration: "Office supplies" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "billType", headerName: "Bill Type", flex: 1 },
    { field: "supplierCode", headerName: "Supplier Code", flex: 1 },
    { field: "docNo", headerName: "Doc No", flex: 1 },
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
    { field: "billAmount", headerName: "Bill Amount", flex: 1 },
    { field: "cgstAmt", headerName: "CGST Amt", flex: 1 },
    { field: "sgstAmt", headerName: "SGST Amt", flex: 1 },
    { field: "igstAmt", headerName: "IGST Amt", flex: 1 },
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
                navigate(`/material/finance-supplier-bills-multiple-tax-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Supplier Bills Multiple Tax" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-supplier-bills-multiple-tax-form/add")}
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