import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchFilter from "../SearchFilter";
import {
  getPurchaseOrder,
  PurchaseOrderPaginationAPI,
} from "app/utils/materialTransactionServices";

export default function PurchaseOrderTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [rowCount, setRowCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await PurchaseOrderPaginationAPI(
        "PURCHASE_ORDER",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.id || index + 1,
          Order_No: item.Order_No,
          Order_Date: item.Order_Date
            ? item.Order_Date.split("T")[0]
            : "",
          Supplier: item.Supplier,
          Buyer: item.Buyer,
          Status: item.Status,
          original: item,
        }));

        setRows(formattedRows);
        setRowCount(res.TotalCount || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  // Edit
  const handleEdit = async (row) => {
    try {
      setLoading(true);

      const response = await getPurchaseOrder(row.Order_No);

      if (!response?.data || response?.data?.length === 0) {
        alert("No data found");
        return;
      }

      navigate(`/material/Purchase-Order-form/edit/${row.id}`, {
        state: { purchaseOrder: response?.data },
      });
    } catch (e) {
      console.error(e.message);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Columns
  const columns = [
    { field: "Order_No", headerName: "Order No", flex: 1 },
    { field: "Order_Date", headerName: "Date", flex: 1 },
    { field: "Supplier", headerName: "Supplier", flex: 1 },
    { field: "Buyer", headerName: "Buyer", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
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
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Purchase Order" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Search + Add */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              { value: "Order_No", label: "Order No" },
              { value: "Supplier", label: "Supplier" },
              { value: "Buyer", label: "Buyer" },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/Purchase-Order-form/add")}
          >
            New
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            paginationMode="server"
            rowCount={rowCount}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}