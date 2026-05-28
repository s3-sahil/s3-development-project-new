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

import { SupplierBillsMultipleTaxPaginationAPI } from "app/services/FinanceService";

export default function SupplierBillsMultipleTaxTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [searchField, setSearchField] = useState("supplierCode");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [rowCount, setRowCount] = useState(0);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await SupplierBillsMultipleTaxPaginationAPI(
        "SUPPLIER_BILLS_MULTIPLE_TAX",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchField,
        searchText,
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.id || index + 1,

          billType: item.billType || "",

          supplierCode: item.supplierCode || "",

          docNo: item.docNo || "",

          invoiceNo: item.invoiceNo || "",

          invoiceDate: item.invoiceDate || "",

          billAmount: item.billAmount || "",

          cgstAmt: item.cgstAmt || "",

          sgstAmt: item.sgstAmt || "",

          igstAmt: item.igstAmt || "",

          narration: item.narration || "",

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
      field: "billType",
      headerName: "Bill Type",
      flex: 1,
    },

    {
      field: "supplierCode",
      headerName: "Supplier Code",
      flex: 1,
    },

    {
      field: "docNo",
      headerName: "Doc No",
      flex: 1,
    },

    {
      field: "invoiceNo",
      headerName: "Invoice No",
      flex: 1,
    },

    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      flex: 1,
    },

    {
      field: "billAmount",
      headerName: "Bill Amount",
      flex: 1,
    },

    {
      field: "cgstAmt",
      headerName: "CGST Amt",
      flex: 1,
    },

    {
      field: "sgstAmt",
      headerName: "SGST Amt",
      flex: 1,
    },

    {
      field: "igstAmt",
      headerName: "IGST Amt",
      flex: 1,
    },

    {
      field: "narration",
      headerName: "Narration",
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
                  `/material/finance-supplier-bills-multiple-tax-form/edit/${params.row.id}`,
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
              name: "Supplier Bills Multiple Tax",
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
              <MenuItem value="supplierCode">Supplier Code</MenuItem>

              <MenuItem value="invoiceNo">Invoice No</MenuItem>

              <MenuItem value="docNo">Doc No</MenuItem>

              <MenuItem value="billType">Bill Type</MenuItem>
            </TextField>

            <Button variant="contained" onClick={fetchData}>
              Search
            </Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/finance-supplier-bills-multiple-tax-form/add")
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
