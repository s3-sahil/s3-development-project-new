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

export default function ShiftScheduleTable() {
  const [rows, setRows] = useState([
    { id: 1, day: "01", shift: "F-FIRST" },
    { id: 2, day: "02", shift: "F-FIRST" },
    { id: 3, day: "03", shift: "S-SECOND" },
    { id: 4, day: "04", shift: "G-GENERAL" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "day", headerName: "Day", flex: 1 },
    { field: "shift", headerName: "Shift", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
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
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Shift Schedule" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" startIcon={<Icon>add</Icon>}>
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, background: "#fff", borderRadius: 2, boxShadow: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20]}
          />
        </Box>
      </Stack>
    </Container>
  );
}