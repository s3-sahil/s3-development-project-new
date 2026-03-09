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

export default function OpeningBalanceTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, yearFrom: "2026-04-01", yearTo: "2027-03-31", type: "General Ledger", glCode: "GL1001", amount: "50000", drcr: "D" },
    { id: 2, yearFrom: "2026-04-01", yearTo: "2027-03-31", type: "Sub Ledger", glCode: "SL2002", amount: "25000", drcr: "C" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "yearFrom", headerName: "Financial Year From", flex: 1 },
    { field: "yearTo", headerName: "To", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "glCode", headerName: "GL Code", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "drcr", headerName: "Debit/Credit", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/finance/opening-balance-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Opening Balance" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/finance/opening-balance-form/add")}
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