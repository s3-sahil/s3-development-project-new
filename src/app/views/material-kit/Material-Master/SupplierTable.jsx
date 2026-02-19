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

export default function SupplierTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      code: "J001",
      name: "ABC Traders",
      category: "Domestic",
      country: "India",
      state: "Maharashtra",
      gstNo: "27ABCDE1234F1Z5",
      approved: true,
    },
    {
      id: 2,
      code: "J002",
      name: "XYZ Imports",
      category: "Import",
      country: "Germany",
      state: "Berlin",
      gstNo: "DE123456789",
      approved: false,
    },
  ];

  const columns = [
    { field: "code", headerName: "Supplier Code", width: 150 },
    { field: "name", headerName: "Supplier Name", width: 250 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "gstNo", headerName: "GST No.", width: 200 },
    {
      field: "approved",
      headerName: "Approved",
      width: 120,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-supplier-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Supplier Master" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-supplier-form/add")}
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