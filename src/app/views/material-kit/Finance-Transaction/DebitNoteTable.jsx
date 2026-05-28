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
import { DebitNotePaginationAPI } from "app/utils/FinanceTransactionServices";

export default function DebitNoteTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("category");

  const [paginationModel, setPaginationModel] =
    useState({
      page: 0,
      pageSize: 10,
    });

  const [rowCount, setRowCount] = useState(0);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response =
        await DebitNotePaginationAPI(
          "DEBIT_NOTE",
          paginationModel.page + 1,
          paginationModel.pageSize,
          searchField,
          searchText
        );

      if (response?.Data) {
        const mappedRows = response.Data.map(
          (item, index) => ({
            id: item.id || index + 1,

            category:
              item.category || "",

            customerCode:
              item.customerCode || "",

            voucherNo:
              item.voucherNo || "",

            voucherDate:
              item.voucherDate || "",

            narration:
              item.narration || "",

            billNo:
              item.billNo || "",

            billDate:
              item.billDate || "",

            original: item,
          })
        );

        setRows(mappedRows);

        setRowCount(
          response.TotalCount || 0
        );
      }
    } catch (error) {
      console.error(
        "Fetch Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    paginationModel,
    searchText,
    searchField,
  ]);

  // ================= DELETE =================
  const handleDelete = (id) => {
    setRows(
      rows.filter((row) => row.id !== id)
    );
  };

  // ================= COLUMNS =================
  const columns = [
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },

    {
      field: "customerCode",
      headerName: "Customer Code",
      flex: 1,
    },

    {
      field: "voucherNo",
      headerName: "Voucher No",
      flex: 1,
    },

    {
      field: "voucherDate",
      headerName: "Voucher Date",
      flex: 1,
    },

    {
      field: "narration",
      headerName: "Narration",
      flex: 1,
    },

    {
      field: "billNo",
      headerName: "Bill No",
      flex: 1,
    },

    {
      field: "billDate",
      headerName: "Bill Date",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
        >
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/finance-debit-note-form/edit/${params.row.id}`,
                  {
                    state:
                      params.row.original,
                  }
                )
              }
            >
              <Icon color="primary">
                edit
              </Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                handleDelete(
                  params.row.id
                )
              }
            >
              <Icon color="error">
                delete
              </Icon>
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
            { name: "Debit Note" },
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
          <Box
            display="flex"
            gap={2}
          >
            <TextField
              size="small"
              placeholder="Search..."
              value={searchText}
              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }
            />

            <TextField
              select
              size="small"
              value={searchField}
              onChange={(e) =>
                setSearchField(
                  e.target.value
                )
              }
              sx={{ width: 220 }}
            >
              <MenuItem value="category">
                Category
              </MenuItem>

              <MenuItem value="customerCode">
                Customer Code
              </MenuItem>

              <MenuItem value="voucherNo">
                Voucher No
              </MenuItem>

              <MenuItem value="billNo">
                Bill No
              </MenuItem>
            </TextField>

            <Button
              variant="contained"
              onClick={fetchData}
            >
              Search
            </Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate(
                "/material/finance-debit-note-form/add"
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
            paginationModel={
              paginationModel
            }
            onPaginationModelChange={
              setPaginationModel
            }
            pageSizeOptions={[
              5,
              10,
              20,
            ]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}