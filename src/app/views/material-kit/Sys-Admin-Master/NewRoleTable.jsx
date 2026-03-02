import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NewRoleTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  // Dummy data (replace with API)
  const rows = [
    { id: 1, activity: "Accountsnew" },
    { id: 2, activity: "administrator" },
    { id: 3, activity: "Analysis" },
    { id: 4, activity: "Attendance" },
    { id: 5, activity: "Auditor" },
    { id: 6, activity: "calibration" },
    { id: 7, activity: "Development" },
    { id: 8, activity: "Excise" },
    { id: 9, activity: "Finance Head" },
  ];

  const filteredRows = rows.filter((row) =>
    row.activity.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`terial/system-admin-new-role-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleDelete = (row) => {
    alert("Delete UI Only: " + row.activity);
  };

  const handleAddNew = () => {
    navigate("terial/system-admin-new-role-form/add");
  };

  const columns = [
    {
      field: "activity",
      headerName: "Activity",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row)}>
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
            { name: "SYS ADMIN" },
            { name: "New Role" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}
        <Box display="flex" justifyContent="space-between">
          <TextField
            size="small"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{ height: 500 }}>
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