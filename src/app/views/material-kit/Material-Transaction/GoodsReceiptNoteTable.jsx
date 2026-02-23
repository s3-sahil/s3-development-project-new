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

export default function GoodsReceiptNoteTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      grnNo: "GRN001",
      date: "2026-02-19",
      supplier: "ABC Traders",
      poNo: "PO123",
      challanNo: "CH001",
      invNo: "INV001",
      itemCode: "ST001",
      itemName: "Steel Rod",
      challanQty: 100,
      actualQty: 95,
      uom: "Kg",
      status: "Pending",
    },
    {
      id: 2,
      grnNo: "GRN002",
      date: "2026-02-18",
      supplier: "XYZ Imports",
      poNo: "PO124",
      challanNo: "CH002",
      invNo: "INV002",
      itemCode: "CP002",
      itemName: "Copper Wire",
      challanQty: 50,
      actualQty: 50,
      uom: "Meter",
      status: "Approved",
    },
  ];

  const columns = [
    { field: "grnNo", headerName: "GRN No.", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "supplier", headerName: "Supplier", width: 200 },
    { field: "poNo", headerName: "PO No.", width: 150 },
    { field: "challanNo", headerName: "Challan No.", width: 150 },
    { field: "invNo", headerName: "Invoice No.", width: 150 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "itemName", headerName: "Item Name", width: 200 },
    { field: "challanQty", headerName: "Challan Qty", width: 150 },
    { field: "actualQty", headerName: "Actual Qty", width: 150 },
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-goods-receipt-note-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Goods Receipt Note" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-goods-receipt-note-form/add")}
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