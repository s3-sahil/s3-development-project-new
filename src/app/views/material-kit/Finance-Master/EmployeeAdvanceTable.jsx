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

export default function EmployeeAdvanceTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, empNo: "E001", empName: "John Doe", subCode: "SUB-101" },
    { id: 2, empNo: "E002", empName: "Jane Smith", subCode: "SUB-102" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "empNo", headerName: "Employee No", flex: 1 },
    { field: "empName", headerName: "Employee Name", flex: 2 },
    { field: "subCode", headerName: "Sub Code", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-employee-advance-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "Employee Advance Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-employee-advance-form/add")}
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