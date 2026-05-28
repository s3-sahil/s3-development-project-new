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
import { TDS_PARA_PaginationAPI } from "app/utils/FinanceMasterServices";


export default function TDSParameterTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchColumn, setSearchColumn] = useState("");

  // ================= FETCH DATA =================

  const loadTDS_PARA = async () => {
    try {
      setLoading(true);

      const res = await TDS_PARA_PaginationAPI(
        "TDS_PARA",
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
    loadTDS_PARA();
  }, [page, pageSize, searchQuery, searchColumn]);

  // ================= DELETE =================

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this TDS_PARA?")) {
      try {
        await deleteTDS_PARA(id);

        loadTDS_PARA();

        alert("TDS_PARA deleted successfully.");
      } catch (error) {
        console.error("Delete Error:", error);

        alert("Failed to delete TDS_PARA.");
      }
    }
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "applicableGL",
      headerName: "Applicable GL Code",
      flex: 1,
    },

    {
      field: "tdsGL",
      headerName: "TDS GL Code",
      flex: 1,
    },

    {
      field: "certificateType",
      headerName: "Certificate Type",
      flex: 1,
    },

    {
      field: "section",
      headerName: "Section",
      flex: 1,
    },

    {
      field: "companyTDS",
      headerName: "Company TDS %",
      flex: 1,
    },

    {
      field: "nonCompanyTDS",
      headerName: "Non Company TDS %",
      flex: 1,
    },

    {
      field: "nonItrCompanyTDS",
      headerName: "NON ITR Company TDS %",
      flex: 1,
    },

    {
      field: "nonItrNonCompanyTDS",
      headerName: "NON ITR Non Company TDS %",
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
                  `/material/finance-TDS-parameter-form/edit/${params.row.id}`,
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
              name: "TDS Parameter",
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
                value: "applicableGL",
                label: "Applicable GL Code",
              },

              {
                value: "tdsGL",
                label: "TDS GL Code",
              },

              {
                value: "certificateType",
                label: "Certificate Type",
              },

              {
                value: "section",
                label: "Section",
              },
            ]}
            onSearch={loadTDS_PARA}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-TDS-parameter-form/add")}
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
