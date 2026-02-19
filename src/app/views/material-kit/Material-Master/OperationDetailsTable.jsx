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

export default function OperationDetailsTable() {
  const navigate = useNavigate();

  const rows = [
    { id: 1, code: "53", operationName: "FORKLIFT REPAIR", productionOperation: "N" },
    { id: 2, code: "54", operationName: "FABRICATION WORK", productionOperation: "Y" },
    { id: 3, code: "55", operationName: "INSTALLATION SERVICE", productionOperation: "Y" },
  ];

  const columns = [
    { field: "code", headerName: "Code", width: 120 },
    { field: "operationName", headerName: "Operation Name", width: 300 },
    { field: "productionOperation", headerName: "Production Operation", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/production/operation-details-form/edit/${params.row.id}`, {
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
            { name: "Material" },
            { name: "Operation Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/production/operation-details-form/add")
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