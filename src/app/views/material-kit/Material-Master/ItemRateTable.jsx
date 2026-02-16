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

export default function ItemRateTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      rateType: "Supplier",
      itemCode: "ITM001",
      itemName: "Steel Sheet",
      rate: 120,
      scrapRate: 5,
    },
    {
      id: 2,
      rateType: "Jobwork",
      itemCode: "ITM002",
      itemName: "Cable Tray",
      rate: 250,
      scrapRate: 10,
    },
  ];

  const handleEdit = (row) => {
    navigate(`/material/material-item-rate-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const handleAddNew = () => {
    navigate("/material/material-item-rate-form/add");
  };

  const columns = [
    { field: "rateType", headerName: "Rate Type", width: 150 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "itemName", headerName: "Item Name", width: 220 },
    { field: "rate", headerName: "Rate", width: 120 },
    { field: "scrapRate", headerName: "Scrap Rate", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Item Rate Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 420 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}