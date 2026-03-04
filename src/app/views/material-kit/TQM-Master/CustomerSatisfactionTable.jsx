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

export default function CustomerSatisfactionTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, elementNo: "E001", desc: "Product Quality", optionA: "Excellent", optionB: "Yes", optionC: "Satisfied", optionD: "Timely", optionE: "Recommend" },
    { id: 2, elementNo: "E002", desc: "Service Response", optionA: "Good", optionB: "No", optionC: "Not Satisfied", optionD: "Delayed", optionE: "Not Recommend" },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns = [
    { field: "elementNo", headerName: "Element No", flex: 1 },
    { field: "desc", headerName: "Description", flex: 2 },
    { field: "optionA", headerName: "Option A", flex: 1 },
    { field: "optionB", headerName: "Option B", flex: 1 },
    { field: "optionC", headerName: "Option C", flex: 1 },
    { field: "optionD", headerName: "Option D", flex: 1 },
    { field: "optionE", headerName: "Option E", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/tqm/customer-satisfaction-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "TQM" }, { name: "Customer Satisfaction Survey" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/tqm/customer-satisfaction-form/add")}
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