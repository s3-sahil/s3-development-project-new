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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InOutFlagTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, day: "Mon", shift: "F", in1: "08:00", out1: "12:00", in2: "13:00", out2: "17:00", in3: "-", out3: "-", in4: "-", out4: "-", in5: "-", out5: "-" },
    { id: 2, day: "Tue", shift: "S", in1: "14:00", out1: "18:00", in2: "19:00", out2: "22:00", in3: "-", out3: "-", in4: "-", out4: "-", in5: "-", out5: "-" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    navigate(`/material/TMS-In-Out-flag-form/edit/${row.id}`, { state: row });
  };

  const columns = [
    { field: "day", headerName: "Day", flex: 1 },
    { field: "shift", headerName: "Shift", flex: 1 },
    { field: "in1", headerName: "In Time 1", flex: 1 },
    { field: "out1", headerName: "Out Time 1", flex: 1 },
    { field: "in2", headerName: "In Time 2", flex: 1 },
    { field: "out2", headerName: "Out Time 2", flex: 1 },
    { field: "in3", headerName: "In Time 3", flex: 1 },
    { field: "out3", headerName: "Out Time 3", flex: 1 },
    { field: "in4", headerName: "In Time 4", flex: 1 },
    { field: "out4", headerName: "Out Time 4", flex: 1 },
    { field: "in5", headerName: "In Time 5", flex: 1 },
    { field: "out5", headerName: "Out Time 5", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
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
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "In Out Flag Correction" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-In-Out-flag-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, background: "#fff", borderRadius: 2, boxShadow: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>
      </Stack>
    </Container>
  );
}