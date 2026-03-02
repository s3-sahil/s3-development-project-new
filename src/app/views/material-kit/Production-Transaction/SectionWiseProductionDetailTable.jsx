import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField,
  MenuItem,
  Box,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SectionWiseProductionDetailTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("reportNo");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      section: "PRODUCTION",
      reportNo: "R001",
      reportDate: "2026-03-01",
      shiftFrom: "08:00",
      shiftTo: "16:00",
      shiftIncharge: "John Doe",
      machineNo: "M001",
      cutTime: "2h",
      productCode: "P001",
      operation: "Cutting",
      productionType: "Regular",
      fromTime: "08:00",
      toTime: "12:00",
      totalTime: "4h",
      produceQty: "100",
      rejectionQty: "5",
      okQty: "95",
      wipQty: "10",
      breakdownReason: "Electrical",
      breakdownFrom: "12:00",
      breakdownTo: "13:00",
      totalBreakdownTime: "1h",
      directEmployee: "E101",
      indirectEmployee: "E201",
      employee: "E301",
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/production-section-wise-production-detail-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleAddNew = () => {
    navigate("/material/production-section-wise-production-detail-form/add");
  };

  const columns = [
    { field: "reportNo", headerName: "Report No", width: 120 },
    { field: "reportDate", headerName: "Report Date", width: 150 },
    { field: "shiftFrom", headerName: "Shift From", width: 120 },
    { field: "shiftTo", headerName: "Shift To", width: 120 },
    { field: "shiftIncharge", headerName: "Shift Incharge", width: 180 },
    { field: "machineNo", headerName: "Machine No", width: 150 },
    { field: "cutTime", headerName: "Cut Time", width: 120 },
    { field: "productCode", headerName: "Product Code", width: 150 },
    { field: "operation", headerName: "Operation", width: 150 },
    { field: "productionType", headerName: "Production Type", width: 180 },
    { field: "produceQty", headerName: "Produce Qty", width: 150 },
    { field: "rejectionQty", headerName: "Rejection Qty", width: 150 },
    { field: "okQty", headerName: "OK Qty", width: 120 },
    { field: "wipQty", headerName: "WIP Qty", width: 120 },
    { field: "breakdownReason", headerName: "Breakdown Reason", width: 180 },
    { field: "totalBreakdownTime", headerName: "Breakdown Time", width: 180 },
    { field: "directEmployee", headerName: "Direct Employee", width: 180 },
    { field: "indirectEmployee", headerName: "Indirect Employee", width: 180 },
    { field: "employee", headerName: "Employee", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(params.row)}>
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
            { name: "Section Wise Production Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <TextField
              select
              size="small"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              sx={{ width: 200 }}
            >
              <MenuItem value="reportNo">Report No</MenuItem>
              <MenuItem value="reportDate">Report Date</MenuItem>
              <MenuItem value="shiftIncharge">Shift Incharge</MenuItem>
              <MenuItem value="machineNo">Machine No</MenuItem>
              <MenuItem value="productCode">Product Code</MenuItem>
              <MenuItem value="operation">Operation</MenuItem>
            </TextField>

            <Button variant="contained">Search</Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        {/* DataGrid */}
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}