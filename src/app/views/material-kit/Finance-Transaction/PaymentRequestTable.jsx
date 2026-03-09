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

export default function PaymentRequestTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, requestNo: "PR001", requestDate: "01/04/2025", amount: "50000", bankCode: "BANK001", supplierCode: "SUP001" },
    { id: 2, requestNo: "PR002", requestDate: "02/04/2025", amount: "75000", bankCode: "BANK002", supplierCode: "SUP002" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "requestNo", headerName: "Request No", flex: 1 },
    { field: "requestDate", headerName: "Request Date", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "bankCode", headerName: "Bank Code", flex: 1 },
    { field: "supplierCode", headerName: "Supplier Code", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-payment-request-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Payment Requests" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-payment-request-form/add")}
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