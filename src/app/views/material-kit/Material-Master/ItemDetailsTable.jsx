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

export default function ItemDetailsTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      itemCode: "TL7000711003",
      itemName: "STAMPING TOOLING 7000711003",
      unit: "NOS",
      stockUnit: "NOS",
    },
    {
      id: 2,
      itemCode: "432040-119",
      itemName: "ROD 432040-119",
      unit: "NOS",
      stockUnit: "NOS",
    },
  ];

  const columns = [
    { field: "itemCode", headerName: "Item Code", width: 180 },
    { field: "itemName", headerName: "Item Name", width: 400 },
    { field: "unit", headerName: "Unit", width: 120 },
    { field: "stockUnit", headerName: "Stock Unit", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-item-details-form/edit/${params.row.id}`, {
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
            { name: "Item Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-item-details-form/add")
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