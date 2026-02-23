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

export default function ProductMovementSlipTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      slipNo: "PMS001",
      date: "2026-02-19",
      fromLocation: "Warehouse A",
      toLocation: "Production Line 1",
      itemCode: "ST001",
      quantity: 100,
      uom: "Kg",
      transporter: "ABC Logistics",
      vehicleNo: "MH12AB1234",
      status: "Pending",
    },
    {
      id: 2,
      slipNo: "PMS002",
      date: "2026-02-18",
      fromLocation: "Warehouse B",
      toLocation: "Maintenance Dept",
      itemCode: "CP002",
      quantity: 50,
      uom: "Meter",
      transporter: "XYZ Transport",
      vehicleNo: "DL09XY5678",
      status: "Completed",
    },
  ];

  const columns = [
    { field: "slipNo", headerName: "Slip No.", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "fromLocation", headerName: "From Location", width: 200 },
    { field: "toLocation", headerName: "To Location", width: 200 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "transporter", headerName: "Transporter", width: 200 },
    { field: "vehicleNo", headerName: "Vehicle No.", width: 180 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-product-movement-slip-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Product Movement Slip" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-product-movement-slip-form/add")}
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