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

export default function UOMTable() {
  const navigate = useNavigate();

  const rows = [
    { id: 1, uom: "KG", desc: "Kilogram", decimal: true },
    { id: 2, uom: "NOS", desc: "Numbers", decimal: false },
    { id: 3, uom: "LTR", desc: "Litre", decimal: true },
  ];

  const columns = [
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "desc", headerName: "UOM Description", width: 220 },
    {
      field: "decimal",
      headerName: "Decimal Applicable",
      width: 180,
      renderCell: (params) => (params.value ? "Y" : "N"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/Unit-Of-Management-form/edit/${params.row.id}`, {
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
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Unit Of Management" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Actions */}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/Unit-Of-Management-form/add")}
          >
            New
          </Button>
        </Box>

        {/* DataGrid */}
        <Box sx={{ height: 420 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
      </Stack>
    </Container>
  );
}