import { Container, Box, Icon, IconButton, Tooltip, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductWisePackingTable = () => {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      productCode: "PRD-001",
      packingQty: 10,
      actualPackingQty: 9,
      packingUOM: "BOX",
      packingType: "INNER",
      qty: 100,
      packingCode: "PK-001",
      status: "Active",
    },
  ]);

  const columns = [
    { field: "productCode", headerName: "Product Code", flex: 1 },
    { field: "packingQty", headerName: "Packing Qty", flex: 1 },
    { field: "actualPackingQty", headerName: "Actual Packing Qty", flex: 1 },
    { field: "packingUOM", headerName: "Packing UOM", flex: 1 },
    { field: "packingType", headerName: "Packing Type", flex: 1 },
    { field: "qty", headerName: "Qty", flex: 1 },
    { field: "packingCode", headerName: "Packing Code", flex: 1 },
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
                navigate(`/material/product-wise-packing/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Product Wise Packing" }]} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Icon>add</Icon>}
          onClick={() => navigate("/material/product-wise-packing/add")}
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

export default ProductWisePackingTable;
