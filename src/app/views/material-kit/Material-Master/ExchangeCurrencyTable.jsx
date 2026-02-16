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

export default function ExchangeCurrencyTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      wef: "2026-02-01",
      currency: "USD",
      importRate: "83.8",
      exportRate: "84.2",
    },
    {
      id: 2,
      wef: "2026-02-01",
      currency: "EUR",
      importRate: "90.5",
      exportRate: "91.0",
    },
  ];

  const columns = [
    { field: "wef", headerName: "W.E.F.", width: 150 },
    { field: "currency", headerName: "Currency", width: 150 },
    { field: "importRate", headerName: "Import Rate", width: 150 },
    { field: "exportRate", headerName: "Export Rate", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/finance/exchange-currency-form/edit/${params.row.id}`, {
                state: params.row,
              })
            }
          >
            <Icon color="primary">edit</Icon>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Exchange Currency Master" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/finance/exchange-currency-form/add")
            }
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 420 }}>
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Stack>
    </Container>
  );
}