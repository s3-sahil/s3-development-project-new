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

export default function LoginParameterTable() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [rows] = useState([
    { id: 1, option: "Expired Login", login: "admin" },
    { id: 2, option: "Assign Alternate Login", login: "user01" },
  ]);

  const columns = [
    { field: "option", headerName: "Option", flex: 1 },
    { field: "login", headerName: "Login", flex: 1 },
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
                navigate(`/sysadmin/login-parameter-form/edit/${params.row.id}`, {
                  state: {
                    option:
                      params.row.option === "Expired Login"
                        ? "expired"
                        : "alternate",
                    login: params.row.login,
                  },
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
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "System Admin" },
            { name: "Login Parameter" },
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
              <MenuItem value="option">Option</MenuItem>
              <MenuItem value="login">Login</MenuItem>
            </TextField>
            <Button variant="contained">Search</Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/sysadmin/login-parameter-form/add")
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