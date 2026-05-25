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

export default function ShiftDetailsTable() {
  const navigate = useNavigate();
 
  
  const [rows, setRows] = useState([
    { id: 1, shiftCode: "F", description: "FIRST", shiftStart: "8", shiftEnd: "17", totalHrs: "9", lunchStart: "12.3", lunchEnd: "13", earlyIn: "7.3", division: "C" },
    { id: 2, shiftCode: "G", description: "GENERAL", shiftStart: "8.3", shiftEnd: "17.3", totalHrs: "9", lunchStart: "12.3", lunchEnd: "13", earlyIn: "8", division: "C" },
    { id: 3, shiftCode: "S", description: "SECOND", shiftStart: "15", shiftEnd: "23", totalHrs: "8", lunchStart: "18", lunchEnd: "18.3", earlyIn: "14.3", division: "C" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "shiftCode", headerName: "Shift Code", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "shiftStart", headerName: "Shift Start", flex: 1 },
    { field: "shiftEnd", headerName: "Shift End", flex: 1 },
    { field: "totalHrs", headerName: "Total Hrs", flex: 1 },
    { field: "lunchStart", headerName: "Lunch Start", flex: 1 },
    { field: "lunchEnd", headerName: "Lunch End", flex: 1 },
    { field: "earlyIn", headerName: "Early In", flex: 1 },
    { field: "division", headerName: "Division", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/TMS-Shift-details-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "Shift Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-Shift-details-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500 }}>
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