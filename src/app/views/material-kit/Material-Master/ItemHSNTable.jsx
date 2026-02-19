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

export default function ItemHSNTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      itemCode: "ITM001",
      category: "Mechanical",
      subCategory: "Raw",
      description: "Steel Rod",
      hsnCode: "7207",
      customTariffCode: "CT001",
    },
    {
      id: 2,
      itemCode: "ITM002",
      category: "Electrical",
      subCategory: "Finished",
      description: "Copper Wire",
      hsnCode: "7408",
      customTariffCode: "CT002",
    },
  ];

  const columns = [
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "subCategory", headerName: "Sub-Category", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "hsnCode", headerName: "HSN Code", width: 150 },
    { field: "customTariffCode", headerName: "Custom Tariff Code", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/item-hsn-form/edit/${params.row.id}`, {
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
            { name: "Item HSN Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/item-hsn-form/add")
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