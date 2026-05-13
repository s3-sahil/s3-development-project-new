// ================= TABLE =================

import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../SearchFilter";
import { BreakdownTypePaginationAPI } from "app/utils/ProductionMaterialServices";


export default function BreakdownTypeTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [rowCount, setRowCount] = useState(0);

  // ================= FETCH DATA =================

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await BreakdownTypePaginationAPI(
        "BREAKDOWN_TYPE_MASTER",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.Breakdown_Code || index + 1,
          breakdownTypeCode: item.Breakdown_Type_Code || "",
          breakdownCode: item.Breakdown_Code || "",
          description: item.Description || "",
          category: item.Category || "",
          overallEffApplicable:
            item.Overall_Eff_Applicable === true ? "Yes" : "No",

          original: item,
        }));

        setRows(mappedRows);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  // ================= EDIT =================

  const handleEdit = (row) => {
    navigate(`/material/production-breakdown-type-form/edit/${row.id}`, {
      state: row.original,
    });
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "breakdownTypeCode",
      headerName: "Breakdown Type Code",
      width: 220,
    },
    {
      field: "breakdownCode",
      headerName: "Breakdown Code",
      width: 180,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },
    {
      field: "category",
      headerName: "Category",
      width: 180,
    },
    {
      field: "overallEffApplicable",
      headerName: "Overall Eff. Applicable",
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
            { name: "Maintenance" },
            { name: "Breakdown Type Details" },
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
            onClick={() =>
              navigate("/material/production-breakdown-type-form/add")
            }
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
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}