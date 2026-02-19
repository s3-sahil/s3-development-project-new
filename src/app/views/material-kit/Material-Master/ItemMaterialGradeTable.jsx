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

export default function ItemMaterialGradeTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      itemCategory: "Raw Material",
      categoryName: "Metals",
      itemSubCategory: "Steel",
      subCategoryName: "Carbon Steel",
      gradeCode: "GR001",
      gradeDescription: "High Strength Steel",
      density: "7.85",
    },
    {
      id: 2,
      itemCategory: "Finished Product",
      categoryName: "Alloys",
      itemSubCategory: "Aluminium",
      subCategoryName: "Aluminium Alloy",
      gradeCode: "GR002",
      gradeDescription: "Lightweight Alloy",
      density: "2.70",
    },
  ];

  const columns = [
    { field: "itemCategory", headerName: "Item Category", width: 180 },
    { field: "categoryName", headerName: "Category Name", width: 180 },
    { field: "itemSubCategory", headerName: "Item Sub Category", width: 180 },
    { field: "subCategoryName", headerName: "Sub Category Name", width: 200 },
    { field: "gradeCode", headerName: "Grade Code", width: 150 },
    { field: "gradeDescription", headerName: "Grade Description", width: 250 },
    { field: "density", headerName: "Density", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/item-material-grade-form/edit/${params.row.id}`, {
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
            { name: "Itemwise Material Grade Detail" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/item-material-grade-form/add")
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