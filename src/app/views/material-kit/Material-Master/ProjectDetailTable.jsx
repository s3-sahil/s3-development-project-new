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

export default function ProjectDetailTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      projectCode: "PRJ001",
      projectName: "ERP Implementation",
      totalBudgetedCost: "500000",
      totalActualCost: "450000",
      inUse: "Yes",
    },
    {
      id: 2,
      projectCode: "PRJ002",
      projectName: "Factory Expansion",
      totalBudgetedCost: "1200000",
      totalActualCost: "1180000",
      inUse: "No",
    },
  ];

  const columns = [
    { field: "projectCode", headerName: "Project Code", width: 150 },
    { field: "projectName", headerName: "Project Name", width: 250 },
    { field: "totalBudgetedCost", headerName: "Budgeted Cost", width: 180 },
    { field: "totalActualCost", headerName: "Actual Cost", width: 180 },
    { field: "inUse", headerName: "In Use", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/planning/project-detail-form/edit/${params.row.id}`, {
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
            { name: "Project Detail" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/planning/project-detail-form/add")
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