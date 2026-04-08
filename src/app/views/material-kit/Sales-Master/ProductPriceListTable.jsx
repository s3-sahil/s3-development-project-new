import { Container, Box, Icon, IconButton, Tooltip, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { ProductPriceListPaginationAPI } from "app/utils/authServices";
import { useEffect, useState } from "react";

export default function ProductPriceListTable () {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadProductPriceList = async () => {
    try {

      setLoading(true);
      const res = await ProductPriceListPaginationAPI(
        "PriceList",
        page + 1,
        pageSize
      );

      if (res?.Data) {
        setRows(
          res.Data.map((item, index) => ({
            //id: item.id || index + 1,
            id: item.id ?? `${page}-${index}`,
            ...item,
          }))
        );
        setRowCount(res.TotalCount || 0);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

//  useEffect(() => {
//     loadProductPriceList();
//   }, [page, pageSize]);

useEffect(() => {
  const debounce = setTimeout(() => {
    loadProductPriceList();
  }, 400); // delay in ms

  return () => clearTimeout(debounce); // cancel previous call
}, [page, pageSize]);

  // ✅ Delete handler
const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete?")) {
    const filtered = rows.filter((row) => row.id !== id);
    setRows(filtered);
  }
};

  const columns = [
    { field: "ITEM_CODE", headerName: "Item Code", flex: 1 },
    { field: "sales_rate", headerName: "Sales Rate", flex: 1 },
    { field: "Stock_trans_rate", headerName: "Stock Transfer Rate", flex: 1 },
    { field: "discount_per", headerName: "Disc %", flex: 1 },

    {
      field: "WEF",
      headerName: "WEF",
      flex: 1,
      valueFormatter: (params) =>
        params
      ? new Date(params).toLocaleDateString("en-GB") // dd/mm/yyyy
      : "",
    },
    

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          {/* Edit */}
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/sales-product-price-list-details-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          {/* Delete */}
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
          routeSegments={[{ name: "Sales" }, { name: "Product Price List" }]}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Icon>add</Icon>}
          onClick={() => navigate("/material/sales-product-price-list-details-form/add")}
        >
          New
        </Button>
      </Box>
      <Box
        sx={{
          height: 450,
          width: "100%",
          background: "#fff",
          borderRadius: 2,
        }}
      >
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server" 
            pageSizeOptions={[10, 20, 50, 100]}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
          />
      </Box>
    </Container>
  );
};

//export default ProductPriceListTable;
