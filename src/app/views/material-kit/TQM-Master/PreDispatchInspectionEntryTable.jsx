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

export default function PreDispatchInspectionEntryTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      id: 1,
      customerCode: "CUST001",
      invoiceNo: "INV001",
      invoiceDate: "2026-03-01",
      productCode: "P001",
      serialNo: "S001",
      parameter: "Length",
      dimension: "100mm",
      dimensionMin: "98",
      dimensionMax: "102",
      observations: ["99.8", "99.9", "100", "99.7", "99.8", "99.9", "100", "99.8", "99.9", "100"],
      actualValue: "99.8",
      remark: "OK",
    },
    {
      id: 2,
      customerCode: "CUST002",
      invoiceNo: "INV002",
      invoiceDate: "2026-03-02",
      productCode: "P002",
      serialNo: "S002",
      parameter: "Width",
      dimension: "50mm",
      dimensionMin: "49",
      dimensionMax: "51",
      observations: ["50.1", "50.2", "50.0", "49.9", "50.2", "50.1", "50.0", "49.8", "50.1", "50.2"],
      actualValue: "50.2",
      remark: "Within Limit",
    },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "customerCode", headerName: "Customer Code", flex: 1 },
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
    { field: "productCode", headerName: "Product Code", flex: 1 },
    { field: "serialNo", headerName: "Serial No", flex: 1 },
    { field: "parameter", headerName: "Parameter", flex: 1 },
    { field: "dimension", headerName: "Dimension", flex: 1 },
    { field: "dimensionMin", headerName: "Dimension Min", flex: 1 },
    { field: "dimensionMax", headerName: "Dimension Max", flex: 1 },
    {
      field: "observations",
      headerName: "Observations (1–10)",
      flex: 2,
      renderCell: (params) => params.value.join(", "),
    },
    { field: "actualValue", headerName: "Actual Value", flex: 1 },
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
                navigate(`/material/TQM-Pre-dispatch-inspection-entry-form/edit/${params.row.id}`, {
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
            { name: "Pre-Dispatch Inspection Entry" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TQM-Pre-dispatch-inspection-entry-form/add")}
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