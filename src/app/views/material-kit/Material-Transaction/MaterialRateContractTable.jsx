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

export default function MaterialRateContractTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      itemCode: "ITM001",
      uom: "Kg",
      supplierCode: "SUP001",
      quantity: 100,
      rate: 500,
      discount: 5,
    },
    {
      id: 2,
      itemCode: "ITM002",
      uom: "Meter",
      supplierCode: "SUP002",
      quantity: 200,
      rate: 300,
      discount: 10,
    },
  ];

  const columns = [
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "supplierCode", headerName: "Supplier Code", width: 180 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "rate", headerName: "Rate", width: 120 },
    { field: "discount", headerName: "Discount (%)", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-rate-contract-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Rate Contract" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-rate-contract-form/add")}
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