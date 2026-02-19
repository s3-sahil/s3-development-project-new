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

export default function MachineHourRateTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      machineCode: "MC001",
      gradeCode: "GR001",
      gradeDescription: "High Strength Steel",
      unitHourRate: "500",
    },
    {
      id: 2,
      machineCode: "MC002",
      gradeCode: "GR002",
      gradeDescription: "Aluminium Alloy",
      unitHourRate: "300",
    },
  ];

  const columns = [
    { field: "machineCode", headerName: "Machine Code", width: 150 },
    { field: "gradeCode", headerName: "Grade Code", width: 150 },
    { field: "gradeDescription", headerName: "Grade Description", width: 250 },
    { field: "unitHourRate", headerName: "Unit Hour Rate", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-machine-hour-rate-form/edit/${params.row.id}`, {
                state: params.row,
              })
            }
          >
            <Icon color="primary">edit</Icon>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Machine Hour Rate Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-machine-hour-rate-form/add")
            }
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