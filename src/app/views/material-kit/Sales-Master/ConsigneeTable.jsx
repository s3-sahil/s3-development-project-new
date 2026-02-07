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

export default function ConsigneeTable() {
  const navigate = useNavigate();

  // UI-only mock rows
  const [rows] = useState([
    {
      id: 1,
      consigneeCode: "C001",
      name: "ABC Traders",
      city: "Pune",
      mobile: "9876543210",
      gstNo: "27ABCDE1234F1Z5",
    },
  ]);

  const columns = [
    { field: "consigneeCode", headerName: "Consignee Code", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "gstNo", headerName: "GST No", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => navigate(`/material/sales-consignee-form/edit/${params.row.id}`)}>
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
        <Breadcrumb routeSegments={[{ name: "Master" }, { name: "Consignee" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/sales-consignee-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}
