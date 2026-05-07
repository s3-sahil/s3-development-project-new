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

export default function SubCategoryTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      materialGroup: "MG1",
      category: "Hardware",
      subCode: "SC01",
      subName: "Bolts",
      hsn: "7318",
      inUse: true,
      lifeApplicable: false,
    },
    {
      id: 2,
      materialGroup: "MG2",
      category: "Electrical",
      subCode: "SC02",
      subName: "Switches",
      hsn: "8536",
      inUse: true,
      lifeApplicable: true,
    },
  ];

  const columns = [
    { field: "materialGroup", headerName: "Material Group", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "subCode", headerName: "Sub Code", width: 150 },
    { field: "subName", headerName: "Sub Category Name", width: 200 },
    { field: "hsn", headerName: "HSN Code", width: 120 },
    {
      field: "inUse",
      headerName: "In Use",
      width: 120,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "lifeApplicable",
      headerName: "Life Applicable",
      width: 150,
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
              navigate(
                `/material/material-subcategory-form/edit/${params.row.id}`,
                {
                  state: params.row,
                }
              )
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
            { name: "Sub Category Master" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-subcategory-form/add")
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