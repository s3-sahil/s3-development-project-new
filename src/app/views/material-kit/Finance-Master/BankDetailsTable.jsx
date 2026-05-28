import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { Breadcrumb } from "app/components";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import SearchFilter from "../SearchFilter";

import { Bank_master_PaginationAPI } from "app/utils/FinanceTransactionServices";

export default function BankDetailsTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchColumn, setSearchColumn] = useState("");

  // ================= FETCH DATA =================

  const loadBank_master = async () => {
    try {
      setLoading(true);

      const res = await Bank_master_PaginationAPI(
        "Bank_master",
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
    loadBank_master();
  }, [page, pageSize, searchQuery, searchColumn]);

  // ================= DELETE =================

  const handleDelete = async (id) => {
    // if (window.confirm("Are you sure you want to delete this Bank Master?")) {
    //   try {
    //     await deleteBank_master(id);

    //     loadBank_master();

    //     alert("Bank Master deleted successfully.");
    //   } catch (error) {
    //     console.error("Delete Error:", error);

    //     alert("Failed to delete Bank Master.");
    //   }
    // }
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "Bank_code",
      headerName: "Bank Code",
      flex: 1,
    },

    {
      field: "Bank_name",
      headerName: "Bank Name",
      flex: 2,
    },

    {
      field: "Phone",
      headerName: "Phone",
      flex: 2,
    },

    {
      field: "Bank_add1",
      headerName: "Address",
      flex: 2,
    },

    {
      field: "Acc_code",
      headerName: "Acc Code",
      flex: 1,
    },

    {
      field: "Cheque_flag",
      headerName: "Cheque",
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
                  `/material/finance-bank-details-form/edit/${params.row.id}`,
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
              name: "Bank Details",
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
                value: "Bank_code",
                label: "Bank Code",
              },

              {
                value: "Bank_name",
                label: "Bank Name",
              },

              {
                value: "Phone",
                label: "Phone",
              },

              {
                value: "Acc_code",
                label: "Acc Code",
              },
            ]}
            onSearch={loadBank_master}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-bank-details-form/add")}
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
