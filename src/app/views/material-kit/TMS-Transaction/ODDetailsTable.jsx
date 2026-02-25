import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigation hook

export default function ODDetailsTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      id: 1,
      odDate: "01/02/2026",
      odHours: "4",
      remark: "Client Visit",
      apprFlag: "Y",
      appr: "Manager",
    },
    {
      id: 2,
      odDate: "02/02/2026",
      odHours: "2",
      remark: "Training",
      apprFlag: "P",
      appr: "HR",
    },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    // navigate to edit form with row data
    navigate(`/material/TMS-OD-details-form/edit/${row.id}`, { state: row });
  };

  const columns = [
    { field: "odDate", headerName: "OD Date", flex: 1 },
    { field: "odHours", headerName: "OD Hours", flex: 1 },
    { field: "remark", headerName: "Remark", flex: 2 },
    { field: "apprFlag", headerName: "Appr Flag", flex: 1 },
    { field: "appr", headerName: "Appr", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
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
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb routeSegments={[{ name: "TMS" }, { name: "OD Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-OD-details-form/add")}
          >
            New
          </Button>
        </Box>

        <Box
          sx={{
            height: 500,
            background: "#fff",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>
      </Stack>
    </Container>
  );
}
