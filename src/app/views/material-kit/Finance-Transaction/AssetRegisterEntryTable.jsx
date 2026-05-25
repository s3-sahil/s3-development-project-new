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

export default function AssetRegisterEntryTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, appointmentNo: "AP001", representing: "ABC Corp", visitorName: "John Doe", visitingPerson: "Manager A", appointmentDate: "01/04/2025", appointmentTime: "10:00 AM", purpose: "Business Meeting" },
    { id: 2, appointmentNo: "AP002", representing: "XYZ Ltd", visitorName: "Jane Smith", visitingPerson: "Director B", appointmentDate: "02/04/2025", appointmentTime: "02:00 PM", purpose: "Vendor Discussion" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "appointmentNo", headerName: "Appointment No", flex: 1 },
    { field: "representing", headerName: "Representing", flex: 1 },
    { field: "visitorName", headerName: "Visitor Name", flex: 1 },
    { field: "visitingPerson", headerName: "Visiting Person", flex: 1 },
    { field: "appointmentDate", headerName: "Appointment Date", flex: 1 },
    { field: "appointmentTime", headerName: "Appointment Time", flex: 1 },
    { field: "purpose", headerName: "Purpose", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-asset-register-entry-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "Assign Register Entry" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-asset-register-entry-form/add")}
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