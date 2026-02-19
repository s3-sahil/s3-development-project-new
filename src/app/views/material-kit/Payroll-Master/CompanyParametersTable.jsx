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

export default function CompanyParametersTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const rows = [
    { id: 1, companyName: "S3TECHNOLOGY", pfEmployer: "4.75", division: "1" },
    { id: 2, companyName: "S3TECHNOLOGY", pfEmployer: "3.25", division: "2" },
    { id: 3, companyName: "S3TECHNOLOGY", pfEmployer: "3.25", division: "3" },
  ];

  const filteredRows = rows.filter((row) =>
    row.companyName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEdit = (row) => {
    navigate(`/material/payroll-company-parameters-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const handleAddNew = () => {
    navigate("/material/payroll-company-parameters-form/add");
  };

  const columns = [
    { field: "companyName", headerName: "Company Name", width: 250 },
    { field: "pfEmployer", headerName: "PF Employer (%)", width: 200 },
    { field: "division", headerName: "Division", width: 150 },
    {
      field: "actions",
      headerName: "Action",
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
            { name: "Payroll" },
            { name: "Company Parameters Entry" },
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
              defaultValue="companyName"
              sx={{ width: 150 }}
            >
              <MenuItem value="companyName">Company Name</MenuItem>
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

        <Box sx={{ height: 420, width: "100%" }}>
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