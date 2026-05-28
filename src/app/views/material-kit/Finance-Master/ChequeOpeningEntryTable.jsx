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

import { useEffect, useState } from "react";

import SearchFilter from "../SearchFilter";
import { ChequeOpeningEntryPaginationAPI } from "app/utils/FinanceTransactionServices";


export default function ChequeOpeningEntryTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchColumn, setSearchColumn] = useState("");

  // ================= FETCH DATA =================

  const loadChequeOpeningEntry = async () => {
    try {
      setLoading(true);

      const res = await ChequeOpeningEntryPaginationAPI(
        "CHEQUE_OPENING_ENTRY",
        page + 1,
        pageSize,
        searchColumn,
        searchQuery,
      );

      if (res?.Data) {
        setRows(
          res.Data.map((item, index) => ({
            id: item.id || index + 1,

            ...item,
          })),
        );

        setRowCount(res.TotalCount || 0);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChequeOpeningEntry();
  }, [page, pageSize, searchQuery, searchColumn]);

  // ================= DELETE =================

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "bankCode",
      headerName: "Bank Code",
      flex: 1,
    },

    {
      field: "chequeNo",
      headerName: "Cheque No",
      flex: 1,
    },

    {
      field: "chequeDate",
      headerName: "Cheque Date",
      flex: 1,
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },

    {
      field: "mode",
      headerName: "Mode",
      flex: 1,
    },

    {
      field: "flag",
      headerName: "Flag",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,

      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/finance-cheque-opening-entry-form/edit/${params.row.id}`,
                  {
                    state: params.row,
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
              name: "Cheque Opening Entry",
            },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              {
                value: "bankCode",
                label: "Bank Code",
              },

              {
                value: "chequeNo",
                label: "Cheque No",
              },

              {
                value: "mode",
                label: "Mode",
              },

              {
                value: "flag",
                label: "Flag",
              },
            ]}
            onSearch={loadChequeOpeningEntry}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/finance-cheque-opening-entry-form/add")
            }
          >
            New
          </Button>
        </Box>

        {/* DataGrid */}

        <Box sx={{ height: 620 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            pageSizeOptions={[5, 10, 20]}
            paginationModel={{
              page,
              pageSize,
            }}
            onPaginationModelChange={(model) => {
              setPage(model.page);

              setPageSize(model.pageSize);
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}
