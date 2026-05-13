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
import { ProductCostingParameterPaginationAPI } from "app/utils/ProductionMaterialServices";

export default function ProductCostingParameterTable() {
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

      const res = await ProductCostingParameterPaginationAPI(
        "product_costing_parameter",
        pageNo + 1,
        size,
        searchCol,
        searchVal
      );

      if (res?.Data) {
        const formattedRows = res.Data.map((item, index) => ({
          id: item.id || index + 1,

          unloading: item.unloading || "",
          systems: item.systems || "",
          followUp: item.followUp || "",
          administrative: item.administrative || "",
          financialInterest: item.financialInterest || "",
          sellingDistribution: item.sellingDistribution || "",
          nonCostItem: item.nonCostItem || "",
          profit: item.profit || "",
          rejection: item.rejection || "",
          operationEfficiency: item.operationEfficiency || "",

          original: item,
        }));

        setRows(formattedRows);
        setRowCount(res.TotalCount || 0);
      }
    } catch (err) {
      console.error(
        "Product Costing Parameter Fetch Error:",
        err
      );
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
    navigate(
      `/material/production-product-costing-parameter-form/edit/${row.id}`,
      {
        state: row.original,
      }
    );
  };

  // ✅ Add New
  const handleAddNew = () => {
    navigate("/material/production-product-costing-parameter-form/add");
  };

  // ✅ Columns
  const columns = [
    {
      field: "unloading",
      headerName: "Unloading %",
      width: 130,
    },
    {
      field: "systems",
      headerName: "Systems %",
      width: 130,
    },
    {
      field: "followUp",
      headerName: "Follow Up %",
      width: 130,
    },
    {
      field: "administrative",
      headerName: "Administrative %",
      width: 170,
    },
    {
      field: "financialInterest",
      headerName: "Financial Interest %",
      width: 190,
    },
    {
      field: "sellingDistribution",
      headerName: "Selling & Distribution %",
      width: 220,
    },
    {
      field: "nonCostItem",
      headerName: "Non-Cost Item %",
      width: 170,
    },
    {
      field: "profit",
      headerName: "Profit %",
      width: 120,
    },
    {
      field: "rejection",
      headerName: "Rejection %",
      width: 130,
    },
    {
      field: "operationEfficiency",
      headerName: "Operation Efficiency %",
      width: 220,
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
            { name: "Product Costing Parameters" },
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
              { value: "unloading", label: "Unloading %" },
              { value: "systems", label: "Systems %" },
              { value: "followUp", label: "Follow Up %" },
              {
                value: "administrative",
                label: "Administrative %",
              },
              { value: "profit", label: "Profit %" },
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