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
import { useEffect, useState } from "react";
import { ITEM_CATEGORY_PaginationAPI } from "app/utils/authServices";

export default function ItemCategoryTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);


  const loadItemCategory = async () => {
    setLoading(true);
    const res = await ITEM_CATEGORY_PaginationAPI(
      "CATEGORY",
      page + 1, 
      pageSize
    );

    if (res?.Data) {
      setRows(
        res.Data.map((item, index) => ({
          id: item.id || index + 1, 
          ...item,
        }))
      );
      setRowCount(res.TotalCount || 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadItemCategory();
  }, [page, pageSize]);



  const handleDelete = async (id) => {debugger
    if (window.confirm("Are you sure you want to delete this Salesman?")) {
      try {
        await deleteSalesman(id);
        loadSalesman();
        alert("Salesman deleted successfully.");
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete salesman.");
      }
    }
  };

  const handleEdit = (row) => {
    navigate(`/material/material-item-category-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleAddNew = () => {
    navigate("/material/material-item-category-form/add");
  };

  const columns = [
    { field: "CATG_CODE", headerName: "Category Code", width: 150 },
    { field: "DESC", headerName: "Description", width: 300 },
    { field: "indicator", headerName: "Indicator", width: 120 },
    {
      field: "IN_use",
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