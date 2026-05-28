import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { PaymentRequestPaginationAPI } from "app/utils/FinanceTransactionServices";

export default function PaymentRequestTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [searchField, setSearchField] = useState("requestNo");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [rowCount, setRowCount] = useState(0);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await PaymentRequestPaginationAPI(
        "PAYMENT_REQUEST",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchField,
        searchText,
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.id || index + 1,

          requestNo: item.requestNo || "",

          requestDate: item.requestDate || "",

          amount: item.amount || "",

          bankCode: item.bankCode || "",

          supplierCode: item.supplierCode || "",

          original: item,
        }));

        setRows(mappedRows);

        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchText, searchField]);

  // ================= DELETE =================
  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // ================= COLUMNS =================
  const columns = [
    {
      field: "requestNo",
      headerName: "Request No",
      flex: 1,
    },

    {
      field: "requestDate",
      headerName: "Request Date",
      flex: 1,
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },

    {
      field: "bankCode",
      headerName: "Bank Code",
      flex: 1,
    },

    {
      field: "supplierCode",
      headerName: "Supplier Code",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,

      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/finance-payment-request-form/edit/${params.row.id}`,
                  {
                    state: params.row.original,
                  },
                )
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
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Finance" },
            {
              name: "Payment Requests",
            },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <TextField
              select
              size="small"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              sx={{ width: 220 }}
            >
              <MenuItem value="requestNo">Request No</MenuItem>

              <MenuItem value="supplierCode">Supplier Code</MenuItem>

              <MenuItem value="bankCode">Bank Code</MenuItem>
            </TextField>

            <Button variant="contained" onClick={fetchData}>
              Search
            </Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/finance-payment-request-form/add")
            }
          >
            New
          </Button>
        </Box>

        {/* DataGrid */}
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}
