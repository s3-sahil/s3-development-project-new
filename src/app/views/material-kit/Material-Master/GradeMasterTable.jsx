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

import { useEffect, useState } from "react";

import SearchFilter from "../SearchFilter";

import { GradeMasterPaginationAPI } from "app/utils/materialMaterialServices";

export default function GradeMasterTable() {
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

  const fetchGradeMasterData = async (
    currentPage = page,
    currentPageSize = pageSize,
    currentSearch = searchValue,
    currentColumn = searchColumn,
  ) => {
    setLoading(true);

    const res = await GradeMasterPaginationAPI(
      currentPage + 1,
      currentPageSize,
      currentSearch,
      currentColumn,
    );

    if (res?.Data) {
      const formattedRows = res.Data.map((item, index) => ({
        id: item.grade_code || index + 1,

        gradeCode: item.grade_code,

        gradeDescription: item.grade_desc,

        density: item.density,
      }));

      setRows(formattedRows);

      setRowCount(res.TotalCount || 0);
    } else {
      setRows([]);

      setRowCount(0);
    }

    setLoading(false);
  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    fetchGradeMasterData(page, pageSize);
  }, [page, pageSize]);

  // ================= SEARCH =================

  const handleSearch = async () => {
    setPage(0);

    await fetchGradeMasterData(
      0,
      pageSize,
      searchValue,
      searchColumn,
    );
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "gradeCode",
      headerName: "Grade Code",
      width: 180,
    },

    {
      field: "gradeDescription",
      headerName: "Grade Description",
      width: 300,
    },

    {
      field: "density",
      headerName: "Density",
      width: 150,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 140,

      renderCell: (params) => (
        <>
          {/* EDIT */}

          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/material-grade-master-form/edit/${params.row.id}`,
                  {
                    state: params.row,
                  },
                )
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          {/* DELETE */}

          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/material-grade-master-form/delete/${params.row.id}`,
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
      label: "Grade Code",
      value: "grade_code",
    },

    {
      label: "Grade Description",
      value: "grade_desc",
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* ================= BREADCRUMB ================= */}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Grade Master Details" },
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
          {/* SEARCH FILTER */}

          <SearchFilter
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={columnOptions}
            onSearch={handleSearch}
          />

          {/* NEW BUTTON */}

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-grade-master-form/add")
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
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => {
              setPageSize(newPageSize);

              setPage(0);
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}