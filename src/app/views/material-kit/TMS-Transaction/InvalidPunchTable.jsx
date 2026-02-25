import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigation hook

export default function InvalidPunchTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      id: 1,
      musterDate: "01/02/2026",
      punchingDate: "01/02/2026",
      punchingTime: "08:05",
      shift: "F",
      reason: "Late Entry",
    },
    {
      id: 2,
      musterDate: "02/02/2026",
      punchingDate: "02/02/2026",
      punchingTime: "17:45",
      shift: "G",
      reason: "Early Exit",
    },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    // navigate to edit form with row data
    navigate(`/material/TMS-invalid-punch-form/edit/${row.id}`, { state: row });
  };

  const columns = [
    { field: "musterDate", headerName: "Muster Date", flex: 1 },
    { field: "punchingDate", headerName: "Punching Date", flex: 1 },
    { field: "punchingTime", headerName: "Punching Time", flex: 1 },
    { field: "shift", headerName: "Shift", flex: 1 },
    { field: "reason", headerName: "Reason", flex: 2 },
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
          routeSegments={[
            { name: "TMS" },
            { name: "Invalid Punching Correction" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-invalid-punch-form/add")}
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
