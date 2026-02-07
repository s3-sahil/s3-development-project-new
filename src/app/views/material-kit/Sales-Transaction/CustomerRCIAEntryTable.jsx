import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CustomerRCIAEntryTable() {
  const navigate = useNavigate();

  const [rows] = useState([
    { id: 1, code: "A001", name: "AAA PVT LTD. A001", state: "TAMIL NADU" },
    { id: 2, code: "R002", name: "RRR PVT LTD. R002", state: "MAHARASHTRA" },
    { id: 3, code: "R003", name: "RRR PVT LTD. R003", state: "MAHARASHTRA" },
    { id: 4, code: "U001", name: "UUU PVT LTD. U001", state: "MAHARASHTRA" },
    { id: 5, code: "R001", name: "RRR PVT LTD. R001", state: "MAHARASHTRA" },
  ]);

  const columns = [
    { field: "code", headerName: "Code", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "state", headerName: "State", flex: 1 },
    {
      field: "actions",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/tqm/customer-rcia-entry/edit/${params.row.id}`)
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
          routeSegments={[{ name: "TQM" }, { name: "Customer RCIA Entry" }]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Action Bar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box display="flex" gap={2}>
            <TextField size="small" placeholder="Search..." />
            <TextField size="small" placeholder="Select Column" />
            <Button variant="contained">Search</Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/tqm/customer-rcia-entry/add")}
          >
            New
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
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