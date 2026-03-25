import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { deletecustomerpurchaselogindetail } from "app/utils/authServices";
import { CustomerPurchaseOrderLoginPaginationAPI } from "app/utils/salesTransactionServices";
import SearchFilter from "../SearchFilter";

export default function CustomersPurchaseOrderLoginTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fetchPurchaseOrders = async () => {
    setLoading(true);
    try {
      const response = await CustomerPurchaseOrderLoginPaginationAPI(
        "custpo_hed",
        paginationModel.page + 1,
        paginationModel.pageSize
      );

      if (response && response.Data) {
        const mappedRows = response.Data.map((row, index) => ({
          ...row,
          id: row.PO_ID || index, // Ensure unique ID
        }));
        setRows(mappedRows);
        setRowCount(response.TotalCount || 0);
      } else {
        setRows([]);
        setRowCount(0);
      }
    } catch (error) {
      console.error("Failed to fetch purchase orders:", error);
      setRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseOrders();
  }, [paginationModel]);

  const handleAdd = () => {
    navigate("/material/customers-purchase-order-login-form/add");
  };

  const handleEdit = (row) => {
    navigate(
      `/material/customers-purchase-order-login-form/edit/${row.PO_NO}`,
      {
        state: row,
      },
    );
  };

  const handleSearch = () => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
    fetchPurchaseOrders();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Purchase Order?")) {
      // try {
      //   setLoading(true);
      //   const rowToDelete = rows.find((r) => r.id === id);
      //   if (rowToDelete) {
      //     await deletecustomerpurchaselogindetail(rowToDelete);
      //     alert("Deleted successfully!");
      //     fetchPurchaseOrders();
      //   }
      // } catch (error) {
      //   console.error("Delete Error:", error);
      //   alert("Failed to delete record.");
      // } finally {
      //   setLoading(false);
      // }
    }
  };

  const columns = [
    { field: "PO_NO", headerName: "PO No", width: 150 },
    {
      field: "PO_DT",
      headerName: "PO Date",
      width: 120,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleDateString() : "",
    },
    { field: "CUST_CODE", headerName: "Customer Code", width: 120 },
    { field: "CUST_NAME", headerName: "Customer Name", flex: 1 },
    { field: "PO_ID", headerName: "PO ID", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
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
            { name: "Transaction" },
            { name: "Customer Purchase Order Login" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              { value: "PO_NO", label: "PO No" },
              { value: "CUST_NAME", label: "Customer Name" },
            ]}
            onSearch={handleSearch}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25]}
            getRowId={(row) => row.id}
          />
        </Box>
      </Stack>
    </Container>
  );
}
