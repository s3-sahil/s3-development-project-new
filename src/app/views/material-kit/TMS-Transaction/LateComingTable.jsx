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
import { useNavigate } from "react-router-dom"; // navigation hook

export default function LateComingTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, day: "01", shift: "F", lateBy: "0.5", lateAuth: "Y", earlyBy: "-", earlyAuth: "N", remark: "Authorized" },
    { id: 2, day: "02", shift: "F", lateBy: "-", lateAuth: "N", earlyBy: "1", earlyAuth: "P", remark: "Paid Authorized" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    // navigate to edit form with row data
    navigate(`/material/TMS-late-coming-form/edit/${row.id}`, { state: row });
  };

  const columns = [
    { field: "day", headerName: "Day", flex: 1 },
    { field: "shift", headerName: "Shift", flex: 1 },
    { field: "lateBy", headerName: "Late By (hrs)", flex: 1 },
    { field: "lateAuth", headerName: "Late Auth Flag", flex: 1 },
    { field: "earlyBy", headerName: "Early By (hrs)", flex: 1 },
    { field: "earlyAuth", headerName: "Early Auth Flag", flex: 1 },
    { field: "remark", headerName: "Auth Remark", flex: 2 },
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
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Late Coming & Early Going" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-late-coming-form/add")}
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