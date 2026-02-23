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

export default function MaterialStockAdjustmentTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      adjustmentNo: "MSA001",
      date: "2026-02-19",
      project: "Project A",
      department: "Production",
      itemCode: "ST001",
      quantity: 100,
      uom: "Kg",
      avlStock: 500,
    },
    {
      id: 2,
      adjustmentNo: "MSA002",
      date: "2026-02-18",
      project: "Project B",
      department: "Maintenance",
      itemCode: "CP002",
      quantity: 50,
      uom: "Meter",
      avlStock: 200,
    },
  ];

  const columns = [
    { field: "adjustmentNo", headerName: "Adjustment No.", width: 180 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "project", headerName: "Project", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "avlStock", headerName: "Available Stock", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-stock-adjustment-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Stock Adjustment" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-stock-adjustment-form/add")}
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