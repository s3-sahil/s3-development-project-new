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

export default function ItemCategoryTable() {
  const navigate = useNavigate();

  // 🔹 Dummy Data
  const rows = [
    { id: 1, categoryCode: "01", description: "Body Assembly", indicator: "BO", inUse: true },
    { id: 2, categoryCode: "10", description: "PERFORATED CABLE TRAY", indicator: "FP", inUse: true },
    { id: 3, categoryCode: "11", description: "SHEET", indicator: "RM", inUse: true },
    { id: 4, categoryCode: "12", description: "COIL", indicator: "RM", inUse: false },
    { id: 5, categoryCode: "13", description: "STRIP", indicator: "RM", inUse: true },
  ];

  const handleEdit = (row) => {
    navigate(`/material/material-item-category-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleDelete = (id) => {
    console.log("Delete record:", id);
  };

  const handleAddNew = () => {
    navigate("/material/material-item-category-form/add");
  };

  const columns = [
    { field: "categoryCode", headerName: "Category Code", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "indicator", headerName: "Indicator", width: 120 },
    {
      field: "inUse",
      headerName: "In Use",
      width: 120,
      renderCell: (params) => (params.value ? "Yes" : "—"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <>
          {/* <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip> */}

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
            { name: "Item Category Detail" },
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

        <Box sx={{ height: 420, width: "100%" }}>
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