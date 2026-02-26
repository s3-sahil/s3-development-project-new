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

export default function LoginDetailsTable() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [rows] = useState([
    { id: 1, loginName: "admin", password: "admin", division: "2", empNo: "null" },
    { id: 2, loginName: "S3T", password: "S3T", division: "C", empNo: "00165" },
    { id: 3, loginName: "s3", password: "s3", division: "C", empNo: "00165" },
  ]);

  const columns = [
    { field: "loginName", headerName: "Login Name", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
    { field: "division", headerName: "DIVISION", flex: 1 },
    { field: "empNo", headerName: "EMP_NO", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/sysadmin/login-details-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
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
            { name: "System Admin" },
            { name: "Login Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <TextField size="small" select defaultValue="">
              <MenuItem value="">Select Column</MenuItem>
              <MenuItem value="loginName">Login Name</MenuItem>
              <MenuItem value="division">Division</MenuItem>
            </TextField>
            <Button variant="contained">Search</Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/sysadmin/login-details-form/add")
            }
          >
            New
          </Button>
        </Box>

        {/* Data Grid */}
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}