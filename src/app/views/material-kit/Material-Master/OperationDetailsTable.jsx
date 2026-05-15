import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { DataGrid } from "@mui/x-data-grid";

import { Breadcrumb } from "app/components";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import SearchFilter from "../SearchFilter";

import { OperationPaginationAPI } from "app/utils/materialMaterialServices";

export default function OperationDetailsTable() {
  const navigate = useNavigate();

  // ================= STATES =================

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(false);

  // ================= SEARCH STATES =================

  const [searchValue, setSearchValue] = useState("");

  const [searchColumn, setSearchColumn] = useState("");

  // ================= FETCH DATA =================

  const fetchOperationData = async (
    currentPage = page,
    currentPageSize = pageSize,
  ) => {
    try {
      setLoading(true);

      const res = await OperationPaginationAPI({
        pageNumber: currentPage + 1,

        pageSize: currentPageSize,

        searchString: searchValue,

        columnNameForSearch: searchColumn,
      });

      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.code || index + 1,

          code: item.code,

          operationName: item.operation_name,

          productionOperation: item.production_operation,
        }));

        setRows(formattedRows);

        setRowCount(res.TotalCount || 0);
      } else {
        setRows([]);

        setRowCount(0);
      }
    } catch (error) {
      console.error("Operation Fetch Error:", error);

      setRows([]);

      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================

  const handleSearch = async () => {
    setPage(0);

    await fetchOperationData(0, pageSize);
  };

  // ================= PAGINATION =================

  const handlePageChange = async (newPage) => {
    setPage(newPage);

    await fetchOperationData(newPage, pageSize);
  };

  const handlePageSizeChange = async (newPageSize) => {
    setPageSize(newPageSize);

    setPage(0);

    await fetchOperationData(0, newPageSize);
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "code",
      headerName: "Code",
      width: 120,
    },

    {
      field: "operationName",
      headerName: "Operation Name",
      width: 300,
    },

    {
      field: "productionOperation",
      headerName: "Production Operation",
      width: 200,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,

      sortable: false,

      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(
                `/material/material-operation-details-form/edit/${params.row.id}`,
                {
                  state: params.row,
                },
              )
            }
          >
            <Icon color="primary">edit</Icon>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // ================= SEARCH OPTIONS =================

  const columnOptions = [
    {
      label: "Code",
      value: "OP_CODE",
    },

    {
      label: "Operation Name",
      value: "PROFCENCD",
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* ================= BREADCRUMB ================= */}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Operation Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* ================= TOP SECTION ================= */}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          {/* ================= SEARCH FILTER ================= */}

          <SearchFilter
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={columnOptions}
            onSearch={handleSearch}
          />

          {/* ================= NEW BUTTON ================= */}

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-operation-details-form/add")
            }
          >
            New
          </Button>
        </Box>

        {/* ================= DATAGRID ================= */}

        <Box sx={{ height: 450 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            paginationMode="server"
            rowCount={rowCount}
            page={page}
            pageSize={pageSize}
            loading={loading}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </Box>
      </Stack>
    </Container>
  );
}