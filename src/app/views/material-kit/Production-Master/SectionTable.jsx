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
import { SectionPaginationAPI } from "app/utils/ProductionMaterialServices";

export default function SectionTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  // ✅ Fetch Data
  const fetchData = async (
    pageNo = page,
    size = pageSize,
    searchCol = searchColumn,
    searchVal = searchQuery
  ) => {
    try {
      setLoading(true);

      const res = await SectionPaginationAPI(
        "section_master",
        pageNo + 1,
        size,
        searchCol,
        searchVal
      );

      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.id || index + 1,

          sectionCode: item.sectionCode || "",
          sectionName: item.sectionName || "",
          department: item.department || "",

          original: item,
        }));

        setRows(formattedRows);
        setRowCount(res.TotalCount || 0);
      }
    } catch (err) {
      console.error("Section Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  // ✅ Search
  const handleSearch = () => {
    fetchData(0, pageSize, searchColumn, searchQuery);
    setPage(0);
  };

  // ✅ Edit
  const handleEdit = (row) => {
    navigate(`/material/production-section-form/edit/${row.id}`, {
      state: row.original,
    });
  };

  // ✅ Add New
  const handleAddNew = () => {
    navigate("/material/production-section-form/add");
  };

  // ✅ Columns
  const columns = [
    {
      field: "sectionCode",
      headerName: "Section Code",
      flex: 1,
    },
    {
      field: "sectionName",
      headerName: "Section Name",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
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

  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Production" },
            { name: "Section Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Search + Add */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              { value: "sectionCode", label: "Section Code" },
              { value: "sectionName", label: "Section Name" },
              { value: "department", label: "Department" },
            ]}
            onSearch={handleSearch}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            paginationMode="server"
            rowCount={rowCount}
            pageSizeOptions={[5, 10, 20]}
            paginationModel={{ page, pageSize }}
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