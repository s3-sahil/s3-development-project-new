import { Box, Button, Container, Icon, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerWiseProductPriceTable = () => {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      customer: "ABC Industries",
      productCode: "PRD-001",
      productName: "Steel Rod",
      packingQty: 10,
      mrp: 1200,
      salesRate: 1100,
      additionalRate: 50,
      finalRate: 1150,
      status: "Active",
    },
  ]);

  const columns = [
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "productCode", headerName: "Product Code", flex: 1 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "packingQty", headerName: "Packing Qty", flex: 1 },
    { field: "mrp", headerName: "MRP", flex: 1 },
    { field: "salesRate", headerName: "Sales Rate", flex: 1 },
    { field: "additionalRate", headerName: "Additional Rate", flex: 1 },
    { field: "finalRate", headerName: "Final Rate", flex: 1 },
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
                navigate(`/material/sales-customer-wise-product-price-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Sales" }, { name: "Customer Wise Product Price List" }]} />
      </Box>

       <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/sales-customer-wise-product-price-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 520, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
        </Box>
      </Stack>
    </Container>
  );
};

export default CustomerWiseProductPriceTable;
