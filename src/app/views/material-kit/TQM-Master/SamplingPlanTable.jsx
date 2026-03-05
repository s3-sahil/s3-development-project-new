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

export default function SamplingPlanTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, itemCategory: "Bolts", lotSize: 100, sampleSize: 10, acceptanceNo: 2, rejectedNo: 3, uom: "pcs" },
    { id: 2, itemCategory: "Nuts", lotSize: 200, sampleSize: 20, acceptanceNo: 3, rejectedNo: 5, uom: "pcs" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "itemCategory", headerName: "Item Category", flex: 1 },
    { field: "lotSize", headerName: "Lot Size", flex: 1 },
    { field: "sampleSize", headerName: "Sample Size", flex: 1 },
    { field: "acceptanceNo", headerName: "Acceptance No.", flex: 1 },
    { field: "rejectedNo", headerName: "Rejected No.", flex: 1 },
    { field: "uom", headerName: "UOM", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/TQM-sampling-plan-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "Inspection Sampling Plan" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TQM-sampling-plan-form/add")}
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