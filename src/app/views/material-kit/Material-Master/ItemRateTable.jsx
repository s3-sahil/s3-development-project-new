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

import { ItemRatePaginationAPI } from "app/utils/materialMaterialServices";

export default function ItemRateTable() {
  const navigate = useNavigate();

  // ================= STATES =================

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(5);

  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(false);

  // ================= SEARCH STATES =================

  const [searchValue, setSearchValue] = useState("");

  const [searchColumn, setSearchColumn] = useState("");

  // ================= FETCH API =================

  const fetchItemRateData = async (
    currentPage = page,
    currentPageSize = pageSize,
  ) => {
    try {
      setLoading(true);

      const res = await ItemRatePaginationAPI({
        pageNumber: currentPage + 1,

        pageSize: currentPageSize,

        searchString: searchValue,

        columnNameForSearch: searchColumn,
      });

      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.item_code || index + 1,

          rateType: item.rate_type,

          itemCode: item.item_code,

          itemName: item.item_name,

          rate: item.rate,

          scrapRate: item.scrap_rate,
        }));

        setRows(formattedRows);

        setRowCount(res.TotalCount || 0);
      } else {
        setRows([]);

        setRowCount(0);
      }
    } catch (error) {
      console.error("Item Rate Fetch Error:", error);

      setRows([]);

      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================

  const handleSearch = async () => {
    setPage(0);

    await fetchItemRateData(0, pageSize);
  };

  // ================= PAGINATION =================

  const handlePageChange = async (newPage) => {
    setPage(newPage);

    await fetchItemRateData(newPage, pageSize);
  };

  const handlePageSizeChange = async (newPageSize) => {
    setPageSize(newPageSize);

    setPage(0);

    await fetchItemRateData(0, newPageSize);
  };

  // ================= ACTIONS =================

  const handleEdit = (row) => {
    navigate(`/material/material-item-rate-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const handleAddNew = () => {
    navigate("/material/material-item-rate-form/add");
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "rateType",
      headerName: "Rate Type",
      width: 150,
    },

    {
      field: "itemCode",
      headerName: "Item Code",
      width: 150,
    },

    {
      field: "itemName",
      headerName: "Item Name",
      width: 220,
    },

    {
      field: "rate",
      headerName: "Rate",
      width: 120,
    },

    {
      field: "scrapRate",
      headerName: "Scrap Rate",
      width: 130,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 130,

      sortable: false,

      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.id)}>
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
      label: "Rate Type",
      value: "rate_type",
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* ================= BREADCRUMB ================= */}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Item Rate Details" },
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