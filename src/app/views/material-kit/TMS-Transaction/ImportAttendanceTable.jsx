import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ImportAttendanceTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, date: "01/02/2026", employee: "EMP001", status: "Present" },
    { id: 2, date: "01/02/2026", employee: "EMP002", status: "Absent" },
    { id: 3, date: "01/02/2026", employee: "EMP003", status: "Late" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    navigate(`/material/TMS-import-attendance-form/edit/${row.id}`, {
      state: row,
    });
  };

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "employee", headerName: "Employee", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },
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
        <Breadcrumb
          routeSegments={[{ name: "TMS" }, { name: "Import Attendance" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-import-attendance-form/add")}
          >
            New
          </Button>
        </Box>

        <Box
          sx={{
            height: 500,
            background: "#fff",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
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
