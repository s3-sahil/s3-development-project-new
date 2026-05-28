// ========================= UOMTable.jsx =========================

import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import SearchFilter from "../SearchFilter";

import { UOMPaginationAPI } from "app/utils/materialMaterialServices";

export default function UOMTable() {
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

  // ================= COLUMNS =================

  const columns = [
    {
      field: "uom",
      headerName: "UOM",
      width: 150,
    },

    {
      field: "desc",
      headerName: "UOM Description",
      width: 250,
    },

    {
      field: "decimal",
      headerName: "Decimal Applicable",
      width: 180,

      renderCell: (params) => (params.value ? "Y" : "N"),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 140,

      sortable: false,

      renderCell: (params) => (
        <>
          {/* DELETE */}

          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/Unit-Of-Management-form/delete/${params.row.id}`,
                  {
                    state: {
                      ...params.row,
                      mode: "delete",
                    },
                  },
                )
              }
            >
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  // ================= FETCH DATA =================

  const fetchUOMData = async (
    currentPage = page,
    currentPageSize = pageSize,
  ) => {
    setLoading(true);

    const res = await UOMPaginationAPI({
      pageNumber: currentPage + 1,

      pageSize: currentPageSize,

      // ✅ SEARCH VALUE
      searchString: searchValue,

      // ✅ SEARCH COLUMN
      columnNameForSearch: searchColumn,
    });

    if (res?.Data) {
      const formattedRows = res.Data.map((item, index) => ({
        id: item.UOM || index + 1,

        uom: item.UOM,

        desc: item.uom_desc,

        decimal: item.deci_flag === "Y",
      }));

      setRows(formattedRows);

      setRowCount(res.TotalCount || 0);
    } else {
      setRows([]);

      setRowCount(0);
    }

    setLoading(false);
  };

  // ================= SEARCH =================

  const handleSearch = async () => {
    setPage(0);

    await fetchUOMData(0, pageSize);
  };

  // ================= PAGINATION =================

  const handlePageChange = async (newPage) => {
    setPage(newPage);

    await fetchUOMData(newPage, pageSize);
  };

  const handlePageSizeChange = async (newPageSize) => {
    setPageSize(newPageSize);

    setPage(0);

    await fetchUOMData(0, newPageSize);
  };

  // ================= SEARCH OPTIONS =================

  const columnOptions = [
    {
      label: "UOM",
      value: "UOM",
    },

    {
      label: "Description",
      value: "uom_desc",
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* ================= BREADCRUMB ================= */}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Unit Of Management" },
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
              navigate("/material/Unit-Of-Management-form/add")
            }
          >
            New
          </Button>
        </Box>

        {/* ================= DATAGRID ================= */}

        <Box sx={{ height: 500 }}>
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