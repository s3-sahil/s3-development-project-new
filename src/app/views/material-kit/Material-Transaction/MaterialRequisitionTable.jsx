import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";

export default function MaterialRequisitionTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      mrNo: "MR001",
      date: "2026-02-20",
      department: "Production",
      project: "Project A",
      itemCode: "ST001",
      quantity: 100,
      uom: "Kg",
      avlStock: 500,
      status: "Pending",
    },
    {
      id: 2,
      mrNo: "MR002",
      date: "2026-02-19",
      department: "Maintenance",
      project: "Project B",
      itemCode: "CP002",
      quantity: 50,
      uom: "Meter",
      avlStock: 200,
      status: "Approved",
    },
  ];

  const columns = [
    { field: "mrNo", headerName: "MR No.", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "project", headerName: "Project", width: 200 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "avlStock", headerName: "Available Stock", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Approved" ? "success" : "warning"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-requisition-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Material Requisition" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-requisition-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 420 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableSelectionOnClick
            autoHeight
          />
        </Box>
      </Stack>
    </Container>
  );
}