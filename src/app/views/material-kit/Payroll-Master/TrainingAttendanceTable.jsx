import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TrainingAttendanceTable() {
  const navigate = useNavigate();

  const [rows] = useState([
    { id: 1, trainingId: "TR001", employee: "EMP001", status: "Present", hours: 4 },
  ]);

  const columns = [
    { field: "trainingId", headerName: "Training ID", flex: 1 },
    { field: "employee", headerName: "Employee", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "hours", headerName: "Hours", flex: 1 },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "HR" }, { name: "Training Attendance" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={() => navigate("/hr/training-attendance/add")}>
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