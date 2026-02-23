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

export default function JobworkStockAdjustmentTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      adjustmentNo: "JSA001",
      date: "2026-02-19",
      customer: "ABC Enterprises",
      department: "Production",
      itemCode: "ST001",
      quantity: 100,
      uom: "Kg",
      stock: 500,
      status: "Pending",
    },
    {
      id: 2,
      adjustmentNo: "JSA002",
      date: "2026-02-18",
      customer: "XYZ Imports",
      department: "Maintenance",
      itemCode: "CP002",
      quantity: 50,
      uom: "Meter",
      stock: 200,
      status: "Approved",
    },
  ];

  const columns = [
    { field: "adjustmentNo", headerName: "Adjustment No.", width: 180 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "customer", headerName: "Customer", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "stock", headerName: "Stock", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-jobwork-stock-adjustment-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Jobwork Stock Adjustment" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-jobwork-stock-adjustment-form/add")}
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