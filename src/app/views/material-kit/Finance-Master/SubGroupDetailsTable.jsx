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

export default function SubGroupDetailsTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, subGroupCode: "SG001", groupCode: "GRP001", desc: "Machinery Sub Group", plant: true, oldPlant: false, newPlant: true },
    { id: 2, subGroupCode: "SG002", groupCode: "GRP002", desc: "Furniture Sub Group", plant: false, oldPlant: true, newPlant: false },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "subGroupCode", headerName: "Sub Group Code", flex: 1 },
    { field: "groupCode", headerName: "Group Code", flex: 1 },
    { field: "desc", headerName: "Sub Group Desc", flex: 2 },
    { field: "plant", headerName: "Plant And Machinery", flex: 1, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: "oldPlant", headerName: "Old Plant & Machinery", flex: 1, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: "newPlant", headerName: "New Plant & Machinery", flex: 1, renderCell: (params) => (params.value ? "Yes" : "No") },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/finance/sub-group-details-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Sub Group Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/finance/sub-group-details-form/add")}
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