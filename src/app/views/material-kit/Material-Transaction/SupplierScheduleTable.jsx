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

export default function SupplierScheduleTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      scheduleNo: "SS001",
      date: "2026-02-19",
      supplierCode: "SUP001",
      poNo: "PO123",
      itemCode: "ST001",
      quantity: 100,
      uom: "Kg",
      deliveryDate: "2026-02-25",
      status: "Pending",
    },
    {
      id: 2,
      scheduleNo: "SS002",
      date: "2026-02-18",
      supplierCode: "SUP002",
      poNo: "PO124",
      itemCode: "CP002",
      quantity: 50,
      uom: "Meter",
      deliveryDate: "2026-02-22",
      status: "Scheduled",
    },
  ];

  const columns = [
    { field: "scheduleNo", headerName: "Schedule No.", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "supplierCode", headerName: "Supplier Code", width: 180 },
    { field: "poNo", headerName: "PO No.", width: 150 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "deliveryDate", headerName: "Delivery Date", width: 180 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-supplier-schedule-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Supplier Schedule" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-supplier-schedule-form/add")}
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