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

export default function OutwardChallanTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      challanNo: "CH001",
      date: "2026-02-19",
      outwardType: "Normal",
      supplier: "ABC Traders",
      vehicleNo: "MH12AB1234",
      status: "Pending",
    },
    {
      id: 2,
      challanNo: "CH002",
      date: "2026-02-18",
      outwardType: "Returnable",
      supplier: "XYZ Imports",
      vehicleNo: "DL09XY5678",
      status: "Approved",
    },
  ];

  const columns = [
    { field: "challanNo", headerName: "Challan No.", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "outwardType", headerName: "Outward Type", width: 150 },
    { field: "supplier", headerName: "Supplier", width: 200 },
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
              navigate(`/material/material-outward-challan-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Outward Challan" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-outward-challan-form/add")}
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