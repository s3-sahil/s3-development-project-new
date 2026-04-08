import {
  Container,
  Box,
  Icon,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomerItemDetailsPaginationAPI } from "app/utils/authServices";

const CustomerItemDetailsTable = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // MUI starts from 0
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch data from API
  const fetchTableData = async () => {
    try {
      setLoading(true);

      const res = await CustomerItemDetailsPaginationAPI({
        tableName: "Alternate_Item",
        pageNumber: page + 1, // ⚠️ important
        pageSize: pageSize,
      });

      if (res) {
        const formatted = res.Data.map((item, index) => ({
          id: index + 1 + page * pageSize, // unique id
          customerId: item.cust_Code,
          customer: item.cust_Code,
          productCode: item.Item_Code,
          productName: item.Alternate_item,
          customerItemCode: item.Alternate_item,
          customerItemDescription: item.cust_item_desc,
          status: "Active",
        }));

        setRows(formatted);
        setRowCount(res.TotalCount);
      }
    } catch (error) {
      console.error("Table fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [page, pageSize]);

  // ✅ Columns
  const columns = [
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "productCode", headerName: "Product Code", flex: 1 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "customerItemCode", headerName: "Customer Item Code", flex: 1 },
    {
      field: "customerItemDescription",
      headerName: "Customer Item Description",
      flex: 2,
    },
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
                navigate(
                  `/material/sales-customer-item-details-form/edit/${params.row.id}`,
                  {
                    state: params.row,
                  }
                )
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
        <Breadcrumb
          routeSegments={[
            { name: "Sales" },
            { name: "Customer Item Details" },
          ]}
        />
      </Box>

      {/* Top Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Icon>add</Icon>}
          onClick={() =>
            navigate("/material/sales-customer-item-details-form/add")
          }
        >
          New
        </Button>
      </Box>

      {/* DataGrid */}
      <Box
        sx={{
          height: 520,
          width: "100%",
          background: "#fff",
          borderRadius: 2,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pagination
          paginationMode="server"   // ✅ VERY IMPORTANT
          rowCount={rowCount}
          page={page}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20, 50]}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default CustomerItemDetailsTable;