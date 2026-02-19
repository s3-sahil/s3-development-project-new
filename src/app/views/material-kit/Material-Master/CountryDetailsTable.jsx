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

export default function CountryDetailsTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      country: "India",
      currency: "INR",
      conversionRate: 1,
      currencyFraction: "Paise",
      subCurrency: "Rupee",
    },
    {
      id: 2,
      country: "USA",
      currency: "USD",
      conversionRate: 83.8,
      currencyFraction: "Cent",
      subCurrency: "Dollar",
    },
  ];

  const columns = [
    { field: "country", headerName: "Country", width: 180 },
    { field: "currency", headerName: "Currency", width: 150 },
    { field: "conversionRate", headerName: "Conversion Rate", width: 180 },
    { field: "currencyFraction", headerName: "Currency Fraction", width: 200 },
    { field: "subCurrency", headerName: "Sub Currency", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-country-details-form/edit/${params.row.id}`, {
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
            { name: "Country Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-country-details-form/add")
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