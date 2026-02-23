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

export default function WipMaterialAdjustmentTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      adjustmentNo: "WIP001",
      date: "2026-02-19",
      department: "Production",
      itemCode: "ST001",
      quantity: 100,
      uom: "Kg",
      status: "Pending",
    },
    {
      id: 2,
      adjustmentNo: "WIP002",
      date: "2026-02-18",
      department: "Maintenance",
      itemCode: "CP002",
      quantity: 50,
      uom: "Meter",
      status: "Approved",
    },
  ];

  const columns = [
    { field: "adjustmentNo", headerName: "Adjustment No.", width: 180 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
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
              navigate(`/material/material-wip-material-adjustment-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "WIP Material Adjustment" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-wip-material-adjustment-form/add")}
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