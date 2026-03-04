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

export default function PreDispatchInspectionDetailsTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      id: 1,
      productCode: "P001",
      serialNo: "S001",
      criticalParameter: "Length",
      dimension: "100mm",
      inspMethod: "Caliper",
      range: "98-102",
      leastCount: "0.01",
      dimensionMin: "98",
      dimensionMax: "102",
      tolerancePos: "+0.2",
      toleranceNeg: "-0.2",
      observations: ["99.8", "99.9", "100", "99.7", "99.8", "99.9", "100", "99.8", "99.9", "100"],
      otherValue: "99.8",
      remark: "OK",
    },
    {
      id: 2,
      productCode: "P002",
      serialNo: "S002",
      criticalParameter: "Width",
      dimension: "50mm",
      inspMethod: "Micrometer",
      range: "49-51",
      leastCount: "0.01",
      dimensionMin: "49",
      dimensionMax: "51",
      tolerancePos: "+0.1",
      toleranceNeg: "-0.1",
      observations: ["50.1", "50.2", "50.0", "49.9", "50.2", "50.1", "50.0", "49.8", "50.1", "50.2"],
      otherValue: "50.2",
      remark: "Within Limit",
    },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "productCode", headerName: "Product Code", flex: 1 },
    { field: "serialNo", headerName: "Serial No", flex: 1 },
    { field: "criticalParameter", headerName: "Critical Parameter", flex: 2 },
    { field: "dimension", headerName: "Dimension", flex: 1 },
    { field: "inspMethod", headerName: "Inspection Method", flex: 1 },
    { field: "range", headerName: "Range", flex: 1 },
    { field: "leastCount", headerName: "Least Count", flex: 1 },
    { field: "dimensionMin", headerName: "Dimension Min", flex: 1 },
    { field: "dimensionMax", headerName: "Dimension Max", flex: 1 },
    { field: "tolerancePos", headerName: "+Ve Tolerance", flex: 1 },
    { field: "toleranceNeg", headerName: "-Ve Tolerance", flex: 1 },
    {
      field: "observations",
      headerName: "Observations (1–10)",
      flex: 2,
      renderCell: (params) => params.value.join(", "),
    },
    { field: "otherValue", headerName: "Other Value", flex: 1 },
    { field: "remark", headerName: "Remark", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/tqm/pre-dispatch-inspection-details-form/edit/${params.row.id}`, {
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
        <Breadcrumb
          routeSegments={[
            { name: "TQM" },
            { name: "Pre-Dispatch Inspection Details Entry" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/tqm/pre-dispatch-inspection-details-form/add")}
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