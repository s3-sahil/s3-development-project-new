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

export default function PurchaseLineRejectionTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      rejectionNo: "PLR001",
      date: "2026-02-19",
      supplier: "ABC Traders",
      poNo: "PO123",
      itemCode: "ST001",
      quantity: 100,
      rejectedQty: 5,
      reason: "Damaged",
      status: "Pending",
    },
    {
      id: 2,
      rejectionNo: "PLR002",
      date: "2026-02-18",
      supplier: "XYZ Imports",
      poNo: "PO124",
      itemCode: "CP002",
      quantity: 50,
      rejectedQty: 2,
      reason: "Quality Issue",
      status: "Approved",
    },
  ];

  const columns = [
    { field: "rejectionNo", headerName: "Rejection No.", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "supplier", headerName: "Supplier", width: 200 },
    { field: "poNo", headerName: "PO No.", width: 150 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "rejectedQty", headerName: "Rejected Qty", width: 150 },
    { field: "reason", headerName: "Reason", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-purchase-line-rejection-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Purchase Line Rejection" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-purchase-line-rejection-form/add")}
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