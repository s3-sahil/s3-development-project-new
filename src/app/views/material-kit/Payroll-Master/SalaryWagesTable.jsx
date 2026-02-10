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

export default function SalaryWagesTable() {
  const navigate = useNavigate();

  const rows = [
    { id: 1, employeeNo: "00001", confirmDate: "05/03/2007", periodInDays: "00", uan: "-" },
    { id: 2, employeeNo: "00002", confirmDate: "16/04/2007", periodInDays: "00", uan: "-" },
  ];

  const columns = [
    { field: "employeeNo", headerName: "Employee No", flex: 1 },
    { field: "confirmDate", headerName: "Confirm Date", flex: 1 },
    { field: "periodInDays", headerName: "Period In Days", flex: 1 },
    { field: "uan", headerName: "UAN", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => navigate(`/material/payroll-salary-wages-form/edit/${params.row.id}`)}>
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
        <Breadcrumb routeSegments={[{ name: "Master" }, { name: "Salary / Wages Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={() => navigate("/material/payroll-salary-wages-form/add")}>
            New
          </Button>
        </Box>

        <Box sx={{ height: 500 }}>
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Stack>
    </Container>
  );
}