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

export default function OvertimeTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      id: 1,
      day: "01",
      shift: "F",
      inTime: "08:00",
      outTime: "17:00",
      extraHrs: "1",
      otInTime: "17:00",
      otOutTime: "18:00",
      otHrs: "1",
      apprFlag: "Y",
    },
    {
      id: 2,
      day: "02",
      shift: "S",
      inTime: "14:00",
      outTime: "22:00",
      extraHrs: "2",
      otInTime: "22:00",
      otOutTime: "00:00",
      otHrs: "2",
      apprFlag: "P",
    },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    // navigate to edit form with row data
    navigate(`/material/TMS-overtime-form/edit/${row.id}`, { state: row });
  };

  const columns = [
    { field: "day", headerName: "Day", flex: 1 },
    { field: "shift", headerName: "Shift", flex: 1 },
    { field: "inTime", headerName: "In Time", flex: 1 },
    { field: "outTime", headerName: "Out Time", flex: 1 },
    { field: "extraHrs", headerName: "Extra Hrs", flex: 1 },
    { field: "otInTime", headerName: "OT In Time", flex: 1 },
    { field: "otOutTime", headerName: "OT Out Time", flex: 1 },
    { field: "otHrs", headerName: "OT Hrs", flex: 1 },
    { field: "apprFlag", headerName: "Approve Flag", flex: 1 },
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
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Overtime Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-overtime-form/add")}
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