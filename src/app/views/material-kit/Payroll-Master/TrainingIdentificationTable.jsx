import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TrainingIdentificationTable() {
  const navigate = useNavigate();

  const [rows] = useState([
    { id: 1, trainingCode: "TR001", description: "Safety Training", flag: "Internal" },
  ]);

  const columns = [
    { field: "trainingCode", headerName: "Training Code", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "flag", headerName: "Flag", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => navigate(`/hr/training-id/edit/${params.row.id}`)}>
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
        <Breadcrumb routeSegments={[{ name: "HR" }, { name: "Training Identification" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={() => navigate("/hr/training-id/add")}>
            New
          </Button>
        </Box>

        <Box sx={{ height: 500 }}>
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Stack>
    </Container>
  );
}