import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";

const rows = [
  { id: 1, fromSalary: 0, toSalary: 3500, employee: 6, employer: 18 },
  { id: 2, fromSalary: 3501, toSalary: 65000, employee: 12, employer: 36 },
  { id: 3, fromSalary: 10000, toSalary: 20000, employee: 100, employer: 200 },
];

const columns = [
  { field: "fromSalary", headerName: "From Salary", flex: 1 },
  { field: "toSalary", headerName: "To Salary", flex: 1 },
  { field: "employee", headerName: "Employee's", flex: 1 },
  { field: "employer", headerName: "Employer's", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
     renderCell: (params) => (
            <>
              <Tooltip title="Edit">
                <IconButton
                  onClick={() =>
                    navigate(`/material/payroll-labour-welfare-slab-form/edit/${params.row.id}`)
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

export default function LabourWelfareSlabTable() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Master" }, { name: "Labour Welfare Slab" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/payroll-labour-welfare-slab-form/add")
            }
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 450 }}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
          />
        </Box>
      </Stack>
    </Container>
  );
}
