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
import { BankReconciliationUntaggingPaginationAPI } from "app/utils/FinanceTransactionServices";


export default function BankReconciliationUntaggingTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchColumn, setSearchColumn] = useState("");

  // ================= FETCH DATA =================

  const loadBankReconciliationUntagging = async () => {
    try {
      setLoading(true);

      const res = await BankReconciliationUntaggingPaginationAPI(
        "BANK_RECONCILIATION_UNTAGGING",
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
    loadBankReconciliationUntagging();
  }, [page, pageSize, searchQuery, searchColumn]);

  // ================= DELETE =================

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "bankName",
      headerName: "Bank Name",
      flex: 2,
    },

    {
      field: "month",
      headerName: "Month",
      flex: 1,
    },

    {
      field: "year",
      headerName: "Year",
      flex: 1,
    },

    {
      field: "chequeNo",
      headerName: "Cheque No",
      flex: 1,
    },

    {
      field: "type",
      headerName: "Type",
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
                  `/material/finance-bank-reconciliation-untagging-form/edit/${params.row.id}`,
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
              name: "Bank Reconciliation Untagging",
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
                value: "bankName",
                label: "Bank Name",
              },

              {
                value: "month",
                label: "Month",
              },

              {
                value: "year",
                label: "Year",
              },

              {
                value: "chequeNo",
                label: "Cheque No",
              },

              {
                value: "type",
                label: "Type",
              },
            ]}
            onSearch={loadBankReconciliationUntagging}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate(
                "/material/finance-bank-reconciliation-untagging-form/add",
              )
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
