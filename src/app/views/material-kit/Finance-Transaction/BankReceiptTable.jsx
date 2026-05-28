import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchFilter from "../SearchFilter";
import { BankReceiptPaginationAPI } from "app/utils/FinanceTransactionServices";

export default function BankReceiptTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [rowCount, setRowCount] = useState(0);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await BankReceiptPaginationAPI(
        "BANK_RECEIPT",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.id || index + 1,
          receiptType: item.receiptType || "",
          customerCode: item.customerCode || "",
          voucherNo: item.voucherNo || "",
          voucherDate: item.voucherDate || "",
          bankCode: item.bankCode || "",
          chequeAmt: item.chequeAmt || "",
          chequeType: item.chequeType || "",
          chequeNo: item.chequeNo || "",
          chequeDate: item.chequeDate || "",
          custBank: item.custBank || "",
          narration: item.narration || "",
          invoiceNo: item.invoiceNo || "",
          original: item,
        }));

        setRows(mappedRows);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error(
        "Bank Receipt Fetch Error:",
        error.response || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  // ================= DELETE =================
  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // ================= COLUMNS =================
  const columns = [
    {
      field: "receiptType",
      headerName: "Receipt Type",
      width: 160,
    },
    {
      field: "customerCode",
      headerName: "Customer Code",
      width: 180,
    },
    {
      field: "voucherNo",
      headerName: "Voucher No",
      width: 160,
    },
    {
      field: "voucherDate",
      headerName: "Voucher Date",
      width: 160,
    },
    {
      field: "bankCode",
      headerName: "Bank Code",
      width: 160,
    },
    {
      field: "chequeAmt",
      headerName: "Cheque Amount",
      width: 160,
    },
    {
      field: "chequeType",
      headerName: "Cheque Type",
      width: 160,
    },
    {
      field: "chequeNo",
      headerName: "Cheque No",
      width: 160,
    },
    {
      field: "chequeDate",
      headerName: "Cheque Date",
      width: 160,
    },
    {
      field: "custBank",
      headerName: "Customer Bank",
      width: 180,
    },
    {
      field: "narration",
      headerName: "Narration",
      width: 200,
    },
    {
      field: "invoiceNo",
      headerName: "Invoice No",
      width: 160,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/finance-bank-receipt-form/edit/${params.row.id}`,
                  {
                    state: params.row.original,
                  }
                )
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
            >
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
            { name: "Bank Receipt" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}
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
              {
                value: "receiptType",
                label: "Receipt Type",
              },
              {
                value: "customerCode",
                label: "Customer Code",
              },
              {
                value: "voucherNo",
                label: "Voucher No",
              },
              {
                value: "bankCode",
                label: "Bank Code",
              },
              {
                value: "invoiceNo",
                label: "Invoice No",
              },
            ]}
            onSearch={fetchData}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate(
                "/material/finance-bank-receipt-form/add"
              )
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