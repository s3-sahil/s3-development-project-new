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
import { useState, useEffect } from "react";
import { BreakdownSlipPaginationAPI } from "app/utils/MaintenanceTransactionServices";


export default function BreakdownSlipTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("slipNo");

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  // ================= FETCH API =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await BreakdownSlipPaginationAPI(
        "BreakDownShopMaster",
        page + 1,
        pageSize,
        searchField,
        searchText
      );

      const data = res?.Data || [];

      const mappedRows = data.map((item, index) => ({
        id: item.id || index + 1,
        slipNo: item.fld_SlipNo || "",
        maintenanceType: item.maintenanceType || "",
        date: item.fld_Date || "",
        reason: item.fld_Reason || "",
        machine: item.fld_MachineNo || "",
        breakdownDate: item.dt_breakdown || "",
        breakdownTime: item.fld_TimeFrom || "",
        reportedTime: item.fld_TimeReported || "",
        reportedBy: item.fld_ReportedBy || "",
      }));

      setRows(mappedRows);
      setRowCount(res?.TotalCount || 0);
    } catch (error) {
      console.error("Fetch Error:", error);
      setRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  // ================= SEARCH =================
  const handleSearch = () => {
    setPage(0);
    fetchData();
  };

  // ================= EDIT =================
  const handleEdit = (row) => {
    navigate(`/material/maintenance-breakdown-slip-form/edit/${row.id}`, {
      state: row,
    });
  };

  // ================= ADD =================
  const handleAddNew = () => {
    navigate("/material/maintenance-breakdown-slip-form/add");
  };

  // ================= COLUMNS =================
  const columns = [
    { field: "slipNo", headerName: "Slip No", width: 150 },
    { field: "maintenanceType", headerName: "Maintenance Type", width: 180 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "reason", headerName: "Reason", width: 250 },
    { field: "machine", headerName: "Machine", width: 200 },
    { field: "breakdownDate", headerName: "Breakdown Date", width: 180 },
    { field: "breakdownTime", headerName: "Breakdown Time", width: 180 },
    { field: "reportedTime", headerName: "Reported Time", width: 180 },
    { field: "reportedBy", headerName: "Reported By", width: 200 },
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
            { name: "Maintenance" },
            { name: "Breakdown Slip Entry" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* SEARCH + ADD */}
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
              <MenuItem value="slipNo">Slip No</MenuItem>
              <MenuItem value="machine">Machine</MenuItem>
              <MenuItem value="reason">Reason</MenuItem>
              <MenuItem value="reportedBy">Reported By</MenuItem>
            </TextField>

            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        {/* GRID */}
        <Box sx={{ height: 450, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            paginationMode="server"
            rowCount={rowCount}
            pageSizeOptions={[5, 10, 20]}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}