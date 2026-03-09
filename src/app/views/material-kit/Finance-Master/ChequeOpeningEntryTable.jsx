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

export default function ChequeOpeningEntryTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, bankCode: "B001", chequeNo: "12345", chequeDate: "2026-03-01", amount: "5000", mode: "Payment", flag: "Debit" },
    { id: 2, bankCode: "B002", chequeNo: "67890", chequeDate: "2026-03-02", amount: "10000", mode: "Payment", flag: "Credit" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "bankCode", headerName: "Bank Code", flex: 1 },
    { field: "chequeNo", headerName: "Cheque No", flex: 1 },
    { field: "chequeDate", headerName: "Cheque Date", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "mode", headerName: "Mode", flex: 1 },
    { field: "flag", headerName: "Flag", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-cheque-opening-entry-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "FINANCE" }, { name: "Cheque Opening Entry" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-cheque-opening-entry-form/add")}
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