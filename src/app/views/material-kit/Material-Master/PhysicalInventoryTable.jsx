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

export default function PhysicalInventoryTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      financialYear: "2025-26",
      month: "022026",
      stockType: "Raw",
      department: "Production",
      itemCode: "ITM001",
      itemName: "Steel Rod",
      stockUOM: "KG",
    },
    {
      id: 2,
      financialYear: "2025-26",
      month: "022026",
      stockType: "Finished",
      department: "Warehouse",
      itemCode: "ITM002",
      itemName: "Copper Wire",
      stockUOM: "NOS",
    },
  ];

  const columns = [
    { field: "financialYear", headerName: "Financial Year", width: 150 },
    { field: "month", headerName: "Month", width: 150 },
    { field: "stockType", headerName: "Stock Type", width: 150 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "itemName", headerName: "Item Name", width: 250 },
    { field: "stockUOM", headerName: "Stock UOM", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-physical-inventory-form/edit/${params.row.id}`, {
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
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Physical Inventory" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-physical-inventory-form/add")
            }
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