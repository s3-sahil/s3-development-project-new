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

export default function GoodsReceiptInspectionTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      grnNo: "GRN001",
      date: "2026-02-19",
      supplier: "ABC Traders",
      itemCode: "ST001",
      quantity: 100,
      inspectedQty: 100,
      acceptedQty: 95,
      rejectedQty: 5,
      status: "Completed",
    },
    {
      id: 2,
      grnNo: "GRN002",
      date: "2026-02-18",
      supplier: "XYZ Imports",
      itemCode: "CP002",
      quantity: 50,
      inspectedQty: 50,
      acceptedQty: 50,
      rejectedQty: 0,
      status: "Approved",
    },
  ];

  const columns = [
    { field: "grnNo", headerName: "GRN No.", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "supplier", headerName: "Supplier", width: 200 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "inspectedQty", headerName: "Inspected Qty", width: 150 },
    { field: "acceptedQty", headerName: "Accepted Qty", width: 150 },
    { field: "rejectedQty", headerName: "Rejected Qty", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-goods-receipt-inspection-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Good Receipt Note ( Inspection )" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-goods-receipt-inspection-form/add")}
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