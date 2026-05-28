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

import { GinValuationPaginationAPI } from "app/utils/materialMaterialServices";

export default function GRNWiseOpeningStockTable() {
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

  const fetchGRNData = async (
    currentPage = page,
    currentPageSize = pageSize,
  ) => {
    try {
      setLoading(true);

      const res = await GinValuationPaginationAPI({
        pageNumber: currentPage + 1,

        pageSize: currentPageSize,

        searchString: searchValue,

        columnNameForSearch: searchColumn,
      });

      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.grn_no || index + 1,

          itemCode: item.item_code,

          itemName: item.item_name,

          grnNo: item.grn_no,

          grnDate: item.grn_date,

          partyName: item.party_name,

          quantity: item.quantity,

          rate: item.rate,

          location: item.location,
        }));

        setRows(formattedRows);

        setRowCount(res.TotalCount || 0);
      } else {
        setRows([]);

        setRowCount(0);
      }
    } catch (error) {
      console.error("GRN Fetch Error:", error);

      setRows([]);

      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================

  const handleSearch = async () => {
    setPage(0);

    await fetchGRNData(0, pageSize);
  };

  // ================= PAGINATION =================

  const handlePageChange = async (newPage) => {
    setPage(newPage);

    await fetchGRNData(newPage, pageSize);
  };

  const handlePageSizeChange = async (newPageSize) => {
    setPageSize(newPageSize);

    setPage(0);

    await fetchGRNData(0, newPageSize);
  };

  // ================= ACTIONS =================

  const handleEdit = (row) => {
    navigate(
      `/material/material-GRN-wise-opening-stock-form/edit/${row.id}`,
      {
        state: row,
      },
    );
  };

  const handleAddNew = () => {
    navigate("/material/material-GRN-wise-opening-stock-form/add");
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "itemCode",
      headerName: "Item Code",
      width: 130,
    },

    {
      field: "itemName",
      headerName: "Item Name",
      width: 180,
    },

    {
      field: "grnNo",
      headerName: "GRN No",
      width: 130,
    },

    {
      field: "grnDate",
      headerName: "GRN Date",
      width: 150,
    },

    {
      field: "partyName",
      headerName: "Party Name",
      width: 180,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
    },

    {
      field: "rate",
      headerName: "Rate",
      width: 120,
    },

    {
      field: "location",
      headerName: "Location",
      width: 150,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,

      sortable: false,

      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/material-GRN-wise-opening-stock-form/delete/${params.row.id}`,
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
      label: "Item Code",
      value: "item_code",
    },

    {
      label: "Item Name",
      value: "item_name",
    },

    {
      label: "GRN No",
      value: "grn_no",
    },

    {
      label: "Party Name",
      value: "party_name",
    },

    {
      label: "Location",
      value: "location",
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* ================= BREADCRUMB ================= */}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "GRN Wise Opening Stock" },
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
            onClick={handleAddNew}
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