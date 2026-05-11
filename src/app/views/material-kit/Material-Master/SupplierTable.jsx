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

import { VendorPaginationAPI } from "app/utils/materialMaterialServices";

export default function SupplierTable() {
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

  const fetchVendorData = async (
    currentPage = page,
    currentPageSize = pageSize,
  ) => {
    try {
      setLoading(true);

      const res = await VendorPaginationAPI({
        pageNumber: currentPage + 1,

        pageSize: currentPageSize,

        searchString: searchValue,

        columnNameForSearch: searchColumn,
      });

      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.vendor_code || index + 1,

          code: item.vendor_code,

          name: item.vendor_name,

          category: item.category,

          country: item.country,

          state: item.state,

          gstNo: item.gst_no,

          approved:
            item.approved === true || item.approved === "Y",
        }));

        setRows(formattedRows);

        setRowCount(res.TotalCount || 0);
      } else {
        setRows([]);

        setRowCount(0);
      }
    } catch (error) {
      console.error("Vendor Fetch Error:", error);

      setRows([]);

      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================

  const handleSearch = async () => {
    setPage(0);

    await fetchVendorData(0, pageSize);
  };

  // ================= PAGINATION =================

  const handlePageChange = async (newPage) => {
    setPage(newPage);

    await fetchVendorData(newPage, pageSize);
  };

  const handlePageSizeChange = async (newPageSize) => {
    setPageSize(newPageSize);

    setPage(0);

    await fetchVendorData(0, newPageSize);
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "code",
      headerName: "Supplier Code",
      width: 150,
    },

    {
      field: "name",
      headerName: "Supplier Name",
      width: 250,
    },

    {
      field: "category",
      headerName: "Category",
      width: 150,
    },

    {
      field: "country",
      headerName: "Country",
      width: 150,
    },

    {
      field: "state",
      headerName: "State",
      width: 150,
    },

    {
      field: "gstNo",
      headerName: "GST No.",
      width: 200,
    },

    {
      field: "approved",
      headerName: "Approved",
      width: 120,

      renderCell: (params) => (params.value ? "Yes" : "No"),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,

      sortable: false,

      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/material-supplier-form/edit/${params.row.id}`,
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
            <IconButton
              onClick={() =>
                navigate(
                  `/material/material-supplier-form/delete/${params.row.id}`,
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

  // ================= SEARCH OPTIONS =================

  const columnOptions = [
    {
      label: "Supplier Code",
      value: "vendor_code",
    },

    {
      label: "Supplier Name",
      value: "vendor_name",
    },

    {
      label: "Category",
      value: "category",
    },

    {
      label: "Country",
      value: "country",
    },

    {
      label: "State",
      value: "state",
    },

    {
      label: "GST No",
      value: "gst_no",
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* ================= BREADCRUMB ================= */}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Supplier Master" },
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
              navigate("/material/material-supplier-form/add")
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