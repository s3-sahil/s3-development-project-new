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
import { MaterialGradePaginationAPI } from "app/utils/materialMaterialServices";

export default function ItemwiseMoqTable() {
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

  // ================= API =================

// ================= API CALL =================

const fetchMaterialGradeData = async (
  currentPage = page,
  currentPageSize = pageSize,
) => {
  setLoading(true);

  const res = await MaterialGradePaginationAPI({
    pageNumber: currentPage + 1,

    pageSize: currentPageSize,

    searchString: searchValue,

    columnNameForSearch: searchColumn,
  });

  if (res?.Data) {
    const formattedRows = res.Data.map((item, index) => ({
      id: item.material_grade || index + 1,

      materialGrade: item.material_grade,

      gradeDesc: item.grade_desc,
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

    await fetchMaterialGradeData(0, pageSize);
  };

  // ================= PAGINATION =================

  const handlePageChange = async (newPage) => {
    setPage(newPage);

    await fetchMaterialGradeData(newPage, pageSize);
  };

  const handlePageSizeChange = async (newPageSize) => {
    setPageSize(newPageSize);

    setPage(0);

    await fetchMaterialGradeData(0, newPageSize);
  };

  // ================= EDIT =================

  const handleEdit = (row) => {
    navigate(`/material/material-item-wise-moq-form/edit/${row.id}`, {
      state: row,
    });
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "materialGrade",
      headerName: "Material Grade",
      width: 220,
    },

    {
      field: "gradeDesc",
      headerName: "Description",
      width: 250,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,

      sortable: false,

      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEdit(params.row)}>
            <Icon color="primary">edit</Icon>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // ================= SEARCH OPTIONS =================

  const columnOptions = [
    {
      label: "Material Grade",
      value: "ITEM_CODE",
    },

    {
      label: "Description",
      value: "PROFCEN_CD",
    },
  ];

  return (
    <Container maxWidth="xl">
      {/* ================= BREADCRUMB ================= */}

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Itemwise MOQ" },
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
              navigate("/material/material-item-wise-moq-form/add")
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