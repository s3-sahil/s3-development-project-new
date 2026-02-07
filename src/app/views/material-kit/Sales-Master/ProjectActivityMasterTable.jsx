import { Box, Button, Container, Icon, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectActivityMasterTable = () => {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      activityCode: "ACT-001",
      activityDescription: "Design & Engineering",
      status: "Active",
    },
    {
      id: 2,
      activityCode: "ACT-002",
      activityDescription: "Procurement",
      status: "Active",
    },
  ]);

  const columns = [
    { field: "activityCode", headerName: "Activity Code", flex: 1 },
    { field: "activityDescription", headerName: "Activity Description", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/sales-project-activity-master-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
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
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Project Activity Master" }]} />
      </Box>

      <Stack elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/sales-project-activity-master-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
        </Box>
      </Stack>
    </Container>
  );
};

export default ProjectActivityMasterTable;
