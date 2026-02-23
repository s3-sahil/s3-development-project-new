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

export default function TMSParameterTable() {
  const navigate = useNavigate();

  const rows = [
    { id: 1, division: "1", shiftPlanApplicable: "Yes", holidayShiftGen: "Y", punchingFileFlag: "No" },
    { id: 2, division: "2", shiftPlanApplicable: "Yes", holidayShiftGen: "Y", punchingFileFlag: "No" },
    { id: 3, division: "3", shiftPlanApplicable: "Yes", holidayShiftGen: "Y", punchingFileFlag: "No" },
  ];

  const columns = [
    { field: "division", headerName: "Division", width: 120 },
    { field: "shiftPlanApplicable", headerName: "Shift Plan Applicable", width: 200 },
    { field: "holidayShiftGen", headerName: "Holiday While Shift Generation", width: 250 },
    { field: "punchingFileFlag", headerName: "Punching File With In Out Flag", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/TMS-parameter-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => alert(`Delete Division ${params.row.division}`)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "TMS Parameter" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-parameter-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 420 }}>
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Stack>
    </Container>
  );
}