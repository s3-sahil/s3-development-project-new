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

export default function EmployeeInformationTable() {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      employeeNo: "00081",
      firstName: "M",
      middleName: "J",
      lastName: "M",
      gender: "M",
      birthDate: "1990-07-01",
      joinDate: "2012-07-01",
      email: "erps3technology@s3technology.in",
      department: "04",
    },
    {
      id: 2,
      employeeNo: "00082",
      firstName: "P",
      middleName: "B",
      lastName: "P",
      gender: "M",
      birthDate: "1988-10-16",
      joinDate: "2012-07-01",
      email: "erps3technology@s3technology.in",
      department: "04",
    },
  ]);

  const columns = [
    { field: "employeeNo", headerName: "Employee No", flex: 1 },
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "middleName", headerName: "Middle Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 0.7 },
    { field: "birthDate", headerName: "Birth Date", flex: 1 },
    { field: "joinDate", headerName: "Join Date", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/payroll-employee-information-form/edit/${params.row.id}`)
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Payroll" }, { name: "Employee Information" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/payroll-employee-information-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}