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
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CloseFinancialYearTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, appointmentNo: "AP001", representing: "ABC Ltd", visitorName: "John Doe", visitingPerson: "Manager A", appointmentDate: "2026-03-10", appointmentTime: "10:00", purpose: "Audit Discussion" },
    { id: 2, appointmentNo: "AP002", representing: "XYZ Corp", visitorName: "Jane Smith", visitingPerson: "Director B", appointmentDate: "2026-03-12", appointmentTime: "14:30", purpose: "Finalization Meeting" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "appointmentNo", headerName: "Appointment No", flex: 1 },
    { field: "representing", headerName: "Representing", flex: 2 },
    { field: "visitorName", headerName: "Visitor Name", flex: 2 },
    { field: "visitingPerson", headerName: "Visiting Person", flex: 2 },
    { field: "appointmentDate", headerName: "Appointment Date", flex: 1 },
    { field: "appointmentTime", headerName: "Appointment Time", flex: 1 },
    { field: "purpose", headerName: "Purpose", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/finance/close-financial-year-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
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
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Close Financial Year" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/finance/close-financial-year-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500 }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10]} />
        </Box>
      </Stack>
    </Container>
  );
}