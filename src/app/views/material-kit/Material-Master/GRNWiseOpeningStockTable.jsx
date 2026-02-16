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

export default function GRNWiseOpeningStockTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      itemCode: "ITM001",
      itemName: "Steel Sheet",
      grnNo: "GRN1001",
      grnDate: "2026-02-10",
      partyName: "ABC Supplier",
      quantity: 100,
      rate: 120,
      location: "Store A",
    },
  ];

  const handleEdit = (row) => {
    navigate(`/material/material-GRN-wise-opening-stock-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const handleAddNew = () => {
    navigate("/material/material-GRN-wise-opening-stock-form/add");
  };

  const columns = [
    { field: "itemCode", headerName: "Item Code", width: 130 },
    { field: "itemName", headerName: "Item Name", width: 180 },
    { field: "grnNo", headerName: "GRN No", width: 130 },
    { field: "grnDate", headerName: "GRN Date", width: 150 },
    { field: "partyName", headerName: "Party Name", width: 180 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "rate", headerName: "Rate", width: 120 },
    { field: "location", headerName: "Location", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
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
            { name: "Material" },
            { name: "GRN Wise Opening Stock" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 450 }}>
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Stack>
    </Container>
  );
}