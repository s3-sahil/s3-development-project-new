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

export default function BreakdownDetailTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("breakdownCode");

  // 🔹 Example Data (UI Only)
  const rows = [
    {
      id: 1,
      breakdownTypeCode: "BT001",
      breakdownCode: "BD001",
      description: "Electrical Failure",
      category: "Electrical",
      overallEffApplicable: true,
    },
    {
      id: 2,
      breakdownTypeCode: "BT002",
      breakdownCode: "BD002",
      description: "Mechanical Failure",
      category: "Mechanical",
      overallEffApplicable: false,
    },
    {
      id: 3,
      breakdownTypeCode: "BT003",
      breakdownCode: "BD003",
      description: "Software Issue",
      category: "Software",
      overallEffApplicable: true,
    },
  ];

  const filteredRows = rows.filter((row) =>
    row[searchField]?.toString().toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/production-breakdown-detail-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleAddNew = () => {
    navigate("/material/production-breakdown-detail-form/add");
  };

  const columns = [
    { field: "breakdownTypeCode", headerName: "Breakdown Type Code", width: 200 },
    { field: "breakdownCode", headerName: "Breakdown Code", width: 180 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "category", headerName: "Category", width: 200 },
    {
      field: "overallEffApplicable",
      headerName: "Overall Eff. Applicable",
      width: 220,
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
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Maintenance" },
            { name: "Breakdown Details" },
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
              <MenuItem value="breakdownTypeCode">Breakdown Type Code</MenuItem>
              <MenuItem value="breakdownCode">Breakdown Code</MenuItem>
              <MenuItem value="description">Description</MenuItem>
              <MenuItem value="category">Category</MenuItem>
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
        <Box sx={{ height: 450, width: "100%" }}>
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