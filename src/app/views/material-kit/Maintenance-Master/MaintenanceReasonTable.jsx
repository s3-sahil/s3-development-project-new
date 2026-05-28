// ========================== TABLE COMPONENT ==========================

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
import { MaintenanceReasonPaginationAPI } from "app/utils/MaintenanceMaterialServices";


export default function MaintenanceReasonTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("description");

  // ================= FETCH API =================
  const fetchData = async (pageNo = page, size = pageSize) => {
    try {
      setLoading(true);

      const res = await MaintenanceReasonPaginationAPI(
        "Reasons",
        pageNo + 1,
        size
      );

      const data = res?.Data || [];

      const mappedRows = data.map((item, index) => ({
        id: item.id || index + 1,
        code: item.code || "",
        description: item.description || "",
        category: item.category || "",
        toBeChecked:
          item.toBeChecked === true ||
          item.toBeChecked === "Y",
      }));

      setRows(mappedRows);
      setFilteredRows(mappedRows);

      setRowCount(res?.TotalCount || mappedRows.length);
    } catch (error) {
      console.error("Fetch Error:", error);
      setRows([]);
      setFilteredRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  // ================= SEARCH =================
  const handleSearch = () => {
    if (!searchText) {
      setFilteredRows(rows);
      return;
    }

    const filtered = rows.filter((row) =>
      row[searchField]
        ?.toString()
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    setFilteredRows(filtered);
  };

  // ================= EDIT =================
  const handleEdit = (row) => {
    navigate(`/material/maintenance-reason-form/edit/${row.id}`, {
      state: row,
    });
  };

  // ================= ADD =================
  const handleAddNew = () => {
    navigate("/material/maintenance-reason-form/add");
  };

  // ================= COLUMNS =================
  const columns = [
    { field: "code", headerName: "Code", width: 150 },

    {
      field: "description",
      headerName: "Description",
      width: 300,
    },

    {
      field: "category",
      headerName: "Category",
      width: 220,
    },

    {
      field: "toBeChecked",
      headerName: "To Be Checked",
      width: 180,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },

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
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Maintenance" },
            { name: "Reason Master" },
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
              <MenuItem value="code">Code</MenuItem>

              <MenuItem value="description">
                Description
              </MenuItem>

              <MenuItem value="category">
                Category
              </MenuItem>
            </TextField>

            <Button
              variant="contained"
              onClick={handleSearch}
            >
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

        {/* DataGrid */}
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
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