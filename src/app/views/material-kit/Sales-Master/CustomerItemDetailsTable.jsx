import { Container, Box, Icon, IconButton, Tooltip, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CustomerItemDetailsTable = () => {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      customer: "ABC Industries",
      productCode: "PRD-001",
      productName: "Steel Rod",
      customerItemCode: "CUST-IT-01",
      customerItemDescription: "Customer specific steel rod",
      status: "Active",
    },
  ]);

  const columns = [
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "productCode", headerName: "Product Code", flex: 1 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "customerItemCode", headerName: "Customer Item Code", flex: 1 },
    { field: "customerItemDescription", headerName: "Customer Item Description", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },

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
                navigate(`/material/sales-customer-item-details-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Sales" }, { name: "Customer Item Details" }]} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Icon>add</Icon>}
          onClick={() => navigate("/material/sales-customer-item-details-form/add")}
        >
          New
        </Button>
      </Box>

      <Box sx={{ height: 520, width: "100%", background: "#fff", borderRadius: 2 }}>
        <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
      </Box>
    </Container>
  );
};

export default CustomerItemDetailsTable;
