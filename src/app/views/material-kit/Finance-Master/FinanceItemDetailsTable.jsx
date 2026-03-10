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

export default function FinanceItemDetailsTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    { id: 1, itemCode: "ITM001", category: "Raw Material", subCategory: "Steel", desc: "Steel Rods", unit: "Kg", glCode: "GL1001" },
    { id: 2, itemCode: "ITM002", category: "Finished Goods", subCategory: "Furniture", desc: "Wooden Chair", unit: "Nos", glCode: "GL2002" },
  ]);

  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

  const columns = [
    { field: "itemCode", headerName: "Item Code", flex: 1 },
    { field: "category", headerName: "Category", flex: 2 },
    { field: "subCategory", headerName: "Sub-Category", flex: 2 },
    { field: "desc", headerName: "Description", flex: 2 },
    { field: "unit", headerName: "Unit", flex: 1 },
    { field: "glCode", headerName: "GL Code", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-item-details-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Item Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-item-details-form/add")}
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