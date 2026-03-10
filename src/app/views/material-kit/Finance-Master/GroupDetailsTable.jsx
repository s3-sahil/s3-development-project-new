import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GroupDetailsTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, groupCode: "GRP001", belongsTo: "Finance", subGroupApplicable: true, desc: "Accounts Group", category: "Assets", schedule: "Schedule I" },
    { id: 2, groupCode: "GRP002", belongsTo: "Operations", subGroupApplicable: false, desc: "Production Group", category: "Expenses", schedule: "Schedule II" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "groupCode", headerName: "Group Code", flex: 1 },
    { field: "belongsTo", headerName: "Group Belongs To", flex: 2 },
    { field: "subGroupApplicable", headerName: "Sub Group Applicable", flex: 1, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: "desc", headerName: "Group Desc", flex: 2 },
    { field: "category", headerName: "Group Category", flex: 1 },
    { field: "schedule", headerName: "Schedule", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-group-details-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Group Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-group-details-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500 }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10]} />
        </Box>
      </Stack>
    </Container>
  );
}