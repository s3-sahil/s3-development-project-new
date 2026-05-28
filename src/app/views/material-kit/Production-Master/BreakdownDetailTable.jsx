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
import { BreakdownDetailPaginationAPI } from "app/utils/ProductionMaterialServices";


export default function BreakdownDetailTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await BreakdownDetailPaginationAPI(
        "vbreakdown_detail",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.id || index + 1,
          breakdownTypeCode: item.Breakdown_Type_Code || "",
          breakdownCode: item.Breakdown_Code || "",
          description: item.Description || "",
          category: item.Category || "",
          overallEffApplicable:
            item.Overall_Eff_Applicable === true ||
            item.Overall_Eff_Applicable === "Y",
          original: item,
        }));

        setRows(mappedRows);
        setRowCount(response?.TotalCount || 0);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  // ================= EDIT =================
  const handleEdit = (row) => {
    navigate(`/material/production-breakdown-detail-form/edit/${row.id}`, {
      state: row.original,
    });
  };

  // ================= ADD =================
  const handleAddNew = () => {
    navigate("/material/production-breakdown-detail-form/add");
  };

  // ================= COLUMNS =================
  const columns = [
    {
      field: "breakdownTypeCode",
      headerName: "Breakdown Type Code",
      flex: 1,
    },
    {
      field: "breakdownCode",
      headerName: "Breakdown Code",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "overallEffApplicable",
      headerName: "Overall Eff. Applicable",
      flex: 1,
      renderCell: (params) => (params.value ? "Yes" : "No"),
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
            { name: "Maintenance" },
            { name: "Breakdown Details" },
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
              {
                value: "Breakdown_Type_Code",
                label: "Breakdown Type Code",
              },
              {
                value: "Breakdown_Code",
                label: "Breakdown Code",
              },
              {
                value: "Description",
                label: "Description",
              },
              {
                value: "Category",
                label: "Category",
              },
            ]}
            onSearch={() => fetchData()}
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
        <Box sx={{ height: 550, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}