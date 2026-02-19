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

export default function ItemwiseMoqTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      itemCode: "ITM001",
      leadTime: 10,
      minQty: 50,
      maxQty: 500,
      reorderLevel: 100,
      orderQty: 200,
      uom: "Nos",
    },
  ];

  const handleEdit = (row) => {
    navigate(`/material/material-item-wise-moq-form/edit/${row.id}`, {
      state: row,
    });
  };

  const columns = [
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "leadTime", headerName: "Lead Time (Days)", width: 150 },
    { field: "minQty", headerName: "Min Qty", width: 120 },
    { field: "maxQty", headerName: "Max Qty", width: 120 },
    { field: "reorderLevel", headerName: "Reorder Level", width: 150 },
    { field: "orderQty", headerName: "Order Qty", width: 120 },
    { field: "uom", headerName: "UOM", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(params.row)}>
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
            { name: "Itemwise MOQ" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-item-wise-moq-form/add")
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