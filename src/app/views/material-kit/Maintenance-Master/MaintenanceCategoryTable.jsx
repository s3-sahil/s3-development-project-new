import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchFilter from "../SearchFilter";
import { MaintenanceCategoryPaginationAPI } from "app/utils/MaintenanceMaterialServices";

export default function MaintenanceCategoryTable() {
  const navigate = useNavigate();

  // ================= STATES =================
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] =
    useState("categoryCode");

  const [paginationModel, setPaginationModel] =
    useState({
      page: 0,
      pageSize: 10,
    });

  const [rowCount, setRowCount] = useState(0);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response =
        await MaintenanceCategoryPaginationAPI(
          "MAINTENANCE_CATEGORY",
          paginationModel.page + 1,
          paginationModel.pageSize,
          searchColumn,
          searchQuery
        );

      if (response?.Data) {
        const mappedRows = response.Data.map(
          (item, index) => ({
            id: item.id || index + 1,

            categoryCode:
              item.categoryCode ||
              item.CATEGORY_CODE ||
              "",

            description:
              item.description ||
              item.DESCRIPTION ||
              "",

            indicator:
              item.indicator ||
              item.INDICATOR ||
              "",

            inUse:
              item.inUse === true ||
              item.inUse === "Y" ||
              item.IN_USE === "Y",

            original: item,
          })
        );

        setRows(mappedRows);
        setRowCount(
          response?.TotalCount ||
            response?.totalCount ||
            mappedRows.length
        );
      } else {
        setRows([]);
        setRowCount(0);
      }
    } catch (error) {
      console.error(
        "Maintenance Category Fetch Error:",
        error
      );
      setRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  // ================= EDIT =================
  const handleEdit = (row) => {
    navigate(
      `/material/maintenance-maintenance-category-form/edit/${row.id}`,
      {
        state: row.original,
      }
    );
  };

  // ================= ADD =================
  const handleAddNew = () => {
    navigate(
      "/material/maintenance-maintenance-category-form/add"
    );
  };

  // ================= COLUMNS =================
  const columns = [
    {
      field: "categoryCode",
      headerName: "Category Code",
      width: 180,
    },

    {
      field: "description",
      headerName: "Description",
      width: 300,
    },

    {
      field: "indicator",
      headerName: "Indicator",
      width: 180,
    },

    {
      field: "inUse",
      headerName: "In Use",
      width: 120,
      renderCell: (params) =>
        params.value ? "Yes" : "No",
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
              handleEdit(params.row)
            }
          >
            <Icon color="primary">edit</Icon>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  // ================= RETURN =================
  return (
    <Container maxWidth="xl">
      {/* Breadcrumb */}
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            {
              name: "Maintenance",
            },
            {
              name: "Maintenance Category",
            },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              {
                value: "categoryCode",
                label: "Category Code",
              },
              {
                value: "description",
                label: "Description",
              },
              {
                value: "indicator",
                label: "Indicator",
              },
            ]}
            onSearch={fetchData}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        {/* DataGrid */}
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={
              setPaginationModel
            }
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}