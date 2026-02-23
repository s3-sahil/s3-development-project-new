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

export default function AdditionalWorkOrderRequisitionTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      requisitionNo: "AWOR001",
      date: "2026-02-19",
      workOrderNo: "WO123",
      department: "Production",
      itemCode: "ST001",
      quantity: 100,
      uom: "Kg",
      reason: "Extra requirement",
      status: "Pending",
    },
    {
      id: 2,
      requisitionNo: "AWOR002",
      date: "2026-02-18",
      workOrderNo: "WO124",
      department: "Maintenance",
      itemCode: "CP002",
      quantity: 50,
      uom: "Meter",
      reason: "Replacement",
      status: "Approved",
    },
  ];

  const columns = [
    { field: "requisitionNo", headerName: "Requisition No.", width: 180 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "workOrderNo", headerName: "Work Order No.", width: 180 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "uom", headerName: "UOM", width: 120 },
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
              navigate(`/material/material-additional-work-order-requisition-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Additional Work Order Requisition" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-additional-work-order-requisition-form/add")}
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