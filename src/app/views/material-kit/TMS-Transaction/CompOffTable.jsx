import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigation hook

export default function CompOffTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      id: 1,
      period: "Feb-2026",
      day: "01",
      shift: "F",
      extraHours: "2",
      takenHrs: "1",
    },
    {
      id: 2,
      period: "Feb-2026",
      day: "02",
      shift: "G",
      extraHours: "3",
      takenHrs: "2",
    },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    // navigate to edit form with row data
    navigate(`/material/TMS-comp-Off-form/edit/${row.id}`, { state: row });
  };

  const columns = [
    { field: "period", headerName: "Period", flex: 1 },
    { field: "day", headerName: "Day", flex: 1 },
    { field: "shift", headerName: "Shift", flex: 1 },
    { field: "extraHours", headerName: "Extra Hours", flex: 1 },
    { field: "takenHrs", headerName: "Taken Hrs", flex: 1 },
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
          routeSegments={[{ name: "TMS" }, { name: "Compensatory Off" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-comp-Off-form/add")}
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
