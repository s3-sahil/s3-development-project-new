import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";

export default function ProfessionTaxTable() {
  const navigate = useNavigate();

  const rows = [
    { id: 1, state: "MAHARASHTRA", slabId: "PT1", gender: "M", salaryFrom: 0, salaryTo: 7500 },
    { id: 2, state: "MAHARASHTRA", slabId: "PT2", gender: "M", salaryFrom: 7501, salaryTo: 10000 },
  ];

  const columns = [
    { field: "state", headerName: "State", flex: 1.5 },
    { field: "slabId", headerName: "Slab ID", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "salaryFrom", headerName: "Salary From", flex: 1 },
    { field: "salaryTo", headerName: "Salary To", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => navigate(`/master/profession-tax/edit/${params.row.id}`)}>
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
        <Breadcrumb routeSegments={[{ name: "Master" }, { name: "Profession Tax Slab" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" startIcon={<Icon>add</Icon>} onClick={() => navigate("/master/profession-tax/add")}>
            New
          </Button>
        </Box>

        <Box sx={{ height: 450 }}>
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Stack>
    </Container>
  );
}