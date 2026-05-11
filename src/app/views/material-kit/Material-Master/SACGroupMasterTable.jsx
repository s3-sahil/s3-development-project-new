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

import { TariffGroupPaginationAPI } from "app/utils/materialMaterialServices";

export default function SACGroupMasterTable() {
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

  const fetchTariffGroupData = async (
    currentPage = page,
    currentPageSize = pageSize,
  ) => {
    try {
      setLoading(true);

      const res = await TariffGroupPaginationAPI({
        pageNumber: currentPage + 1,

        pageSize: currentPageSize,

        searchString: searchValue,

        columnNameForSearch: searchColumn,
      });

      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.group_code || index + 1,

          type: item.type,

          headingNo: item.heading_no,

          groupCode: item.group_code,

          groupDescription: item.group_description,
        }));

        setRows(formattedRows);

        setRowCount(res.TotalCount || 0);
      } else {
        setRows([]);

        setRowCount(0);
      }
    } catch (error) {
      console.error("Tariff Group Fetch Error:", error);

      setRows([]);

      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================

  const handleSearch = async () => {
    setPage(0);

    await fetchTariffGroupData(0, pageSize);
  };

  // ================= PAGINATION =================

  const handlePageChange = async (newPage) => {
    setPage(newPage);

    await fetchTariffGroupData(newPage, pageSize);
  };

  const handlePageSizeChange = async (newPageSize) => {
    setPageSize(newPageSize);

    setPage(0);

    await fetchTariffGroupData(0, newPageSize);
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },

    {
      field: "headingNo",
      headerName: "Heading No",
      width: 150,
    },

    {
      field: "groupCode",
      headerName: "Group Code",
      width: 150,
    },

    {
      field: "groupDescription",
      headerName: "Group Description",
      width: 300,
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
                `/material/material-SAC-group-master-form/edit/${params.row.id}`,
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
      label: "Type",
      value: "type",
    },

    {
      label: "Heading No",
      value: "heading_no",
    },

    {
      label: "Group Code",
      value: "group_code",
    },

    {
      label: "Group Description",
      value: "group_description",
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* ================= BREADCRUMB ================= */}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "SAC Group Master" },
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
              navigate("/material/material-SAC-group-master-form/add")
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