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

export default function AdvanceLeaveDetailsTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  // 🔹 Hardcoded Data (UI Only)
  const rows = [
    { id: 1, empNo: "00165", period: "2022", division: "2", casual: "-", sick: "-", earned: "-" },
    { id: 2, empNo: "00171", period: "2022", division: "2", casual: "-", sick: "-", earned: "-" },
    { id: 3, empNo: "00197", period: "2022", division: "2", casual: "-", sick: "-", earned: "-" },
    { id: 4, empNo: "00270", period: "2022", division: "2", casual: "-", sick: "-", earned: "-" },
  ];

  const filteredRows = rows.filter((row) =>
    row.empNo.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/payroll-advance-leave-details-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleAddNew = () => {
    navigate("/material/payroll-advance-leave-details-form/add");
  };

  const columns = [
    { field: "empNo", headerName: "Employee No", width: 150 },
    { field: "period", headerName: "Period", width: 120 },
    { field: "division", headerName: "Division", width: 120 },
    { field: "casual", headerName: "Advance Casual Leave", width: 200 },
    { field: "sick", headerName: "Advance Sick Leave", width: 200 },
    { field: "earned", headerName: "Advance Earned Leave", width: 200 },
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
            { name: "Payroll" },
            { name: "Advance Leave Details" },
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
              defaultValue="empNo"
              sx={{ width: 150 }}
            >
              <MenuItem value="empNo">Employee No</MenuItem>
              <MenuItem value="period">Period</MenuItem>
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