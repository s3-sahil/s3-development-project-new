import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function DepartmentTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const rows = [
    { id: 1, deptCode: "01", deptName: "MARKETING", family: null, inUse: true, contractorFlag: "N" },
    { id: 2, deptCode: "02", deptName: "MATERIAL", family: null, inUse: true, contractorFlag: "N" },
    { id: 3, deptCode: "03", deptName: "STORES", family: 1, inUse: true, contractorFlag: "STO" },
    { id: 4, deptCode: "04", deptName: "PRODUCTION", family: 1, inUse: true, contractorFlag: "PROD." },
    { id: 5, deptCode: "05", deptName: "QUALITY", family: 1, inUse: true, contractorFlag: "QUALITY" },
    { id: 6, deptCode: "06", deptName: "FPS", family: 1, inUse: true, contractorFlag: "FPS" },
    { id: 7, deptCode: "07", deptName: "VENDOR", family: 1, inUse: true, contractorFlag: "VENDOR" },
    { id: 8, deptCode: "08", deptName: "SCRAP", family: 1, inUse: true, contractorFlag: "SCARP" },
    { id: 9, deptCode: "09", deptName: "LINE REJ.", family: 1, inUse: true, contractorFlag: "LINE REJ." },
    { id: 10, deptCode: "10", deptName: "HR", family: null, inUse: true, contractorFlag: null },
  ];

  const filteredRows = rows.filter((row) =>
    row.deptName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/payroll-department-form/edit/${row.id}`, { state: row });
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const handleAddNew = () => {
    navigate("/material/payroll-department-form/add");
  };

  const columns = [
    { field: "deptCode", headerName: "DEPT CODE", width: 120 },
    { field: "deptName", headerName: "DEPARTMENT NAME", width: 220 },
    { field: "family", headerName: "FAMILY", width: 120 },
    {
      field: "inUse",
      headerName: "IN USE",
      width: 120,
      renderCell: (params) => (params.value ? "true" : "false"),
    },
    { field: "contractorFlag", headerName: "Contractor Flag", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Master" },
            { name: "Department Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <TextField select size="small" defaultValue="deptName">
              <MenuItem value="deptName">Select Column</MenuItem>
            </TextField>
            <Button variant="contained">Search</Button>
          </Stack>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}