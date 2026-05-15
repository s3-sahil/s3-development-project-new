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

import { PhysicalInventoryPaginationAPI } from "app/utils/materialMaterialServices";

export default function PhysicalInventoryTable() {
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

  const fetchPhysicalInventoryData = async (
    currentPage = page,
    currentPageSize = pageSize,
  ) => {
    try {
      setLoading(true);

      const res = await PhysicalInventoryPaginationAPI({
        pageNumber: currentPage + 1,

        pageSize: currentPageSize,

        searchString: searchValue,

        columnNameForSearch: searchColumn,
      });

      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.item_code || index + 1,

          financialYear: item.financial_year,

          month: item.month,

          stockType: item.stock_type,

          department: item.department,

          itemCode: item.item_code,

          itemName: item.item_name,

          stockUOM: item.stock_uom,
        }));

        setRows(formattedRows);

        setRowCount(res.TotalCount || 0);
      } else {
        setRows([]);

        setRowCount(0);
      }
    } catch (error) {
      console.error("Physical Inventory Fetch Error:", error);

      setRows([]);

      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================

  const handleSearch = async () => {
    setPage(0);

    await fetchPhysicalInventoryData(0, pageSize);
  };

  // ================= PAGINATION =================

  const handlePageChange = async (newPage) => {
    setPage(newPage);

    await fetchPhysicalInventoryData(newPage, pageSize);
  };

  const handlePageSizeChange = async (newPageSize) => {
    setPageSize(newPageSize);

    setPage(0);

    await fetchPhysicalInventoryData(0, newPageSize);
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "financialYear",
      headerName: "Financial Year",
      width: 150,
    },

    {
      field: "month",
      headerName: "Month",
      width: 150,
    },

    {
      field: "stockType",
      headerName: "Stock Type",
      width: 150,
    },

    {
      field: "department",
      headerName: "Department",
      width: 200,
    },

    {
      field: "itemCode",
      headerName: "Item Code",
      width: 150,
    },

    {
      field: "itemName",
      headerName: "Item Name",
      width: 250,
    },

    {
      field: "stockUOM",
      headerName: "Stock UOM",
      width: 150,
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
                `/material/material-physical-inventory-form/edit/${params.row.id}`,
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
      label: "Item Code",
      value: "ITEM_CODE",
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* ================= BREADCRUMB ================= */}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Physical Inventory" },
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
              navigate("/material/material-physical-inventory-form/add")
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