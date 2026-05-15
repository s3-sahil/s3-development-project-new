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
import { PreventiveSlipPaginationAPI } from "app/utils/MaintenanceTransactionServices";


export default function PreventiveSlipTable() {
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

      const res = await PreventiveSlipPaginationAPI(
        "MaintenanceTrans",
        page + 1,
        pageSize,
        searchField,
        searchText
      );

      const data = res?.Data || [];

      const mappedRows = data.map((item, index) => ({
        id: item.id || index + 1,
        slipNo: item.fld_SlipNo || "",
        maintenanceType: item.fld_Type || "",
        machine: item.fld_MachineNo || "",
        preventiveReason: item.fld_Reason || "",
        startAt: item.fld_TimeFrom || "",
        date: item.fld_DateFrom || "",
        remark: item.remark || "",
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

  // ================= EFFECT =================
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
    navigate(
      `/material/maintenance-preventive-slip-form/edit/${row.id}`,
      { state: row }
    );
  };

  // ================= ADD =================
  const handleAddNew = () => {
    navigate("/material/maintenance-preventive-slip-form/add");
  };

  // ================= COLUMNS =================
  const columns = [
    { field: "slipNo", headerName: "Slip No", width: 150 },
    { field: "maintenanceType", headerName: "Maintenance Type", width: 200 },
    { field: "machine", headerName: "Machine", width: 200 },
    { field: "preventiveReason", headerName: "Preventive Reason", width: 250 },
    { field: "startAt", headerName: "Start At", width: 180 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "remark", headerName: "Remark", width: 250 },
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
            { name: "Preventive Slip Entry" },
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
              <MenuItem value="preventiveReason">
                Preventive Reason
              </MenuItem>
              <MenuItem value="maintenanceType">
                Maintenance Type
              </MenuItem>
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