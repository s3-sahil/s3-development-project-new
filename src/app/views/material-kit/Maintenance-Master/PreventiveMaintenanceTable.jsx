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
import { PreventiveMaintenancePaginationAPI } from "app/utils/MaintenanceMaterialServices";

export default function PreventiveMaintenanceTable() {
  const navigate = useNavigate();

  // ================= STATES =================
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchColumn, setSearchColumn] = useState("preventiveReason");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [rowCount, setRowCount] = useState(0);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await PreventiveMaintenancePaginationAPI(
        "PREVENTIVE_MAINTENANCE",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery,
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.id || index + 1,

          preventiveReason:
            item.preventiveReason || item.PREVENTIVE_REASON || "",

          machineGroup: item.machineGroup || item.MACHINE_GROUP || "",

          frequency: item.frequency || item.FREQUENCY || "",

          employee: item.employee || item.EMPLOYEE || "",

          original: item,
        }));

        setRows(mappedRows);

        setRowCount(
          response.TotalCount || response.totalCount || mappedRows.length,
        );
      } else {
        setRows([]);
        setRowCount(0);
      }
    } catch (error) {
      console.error("Preventive Maintenance Fetch Error:", error);

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
      `/material/maintenance-preventive-maintenance-form/edit/${row.id}`,
      {
        state: row.original,
      },
    );
  };

  // ================= ADD =================
  const handleAddNew = () => {
    navigate("/material/maintenance-preventive-maintenance-form/add");
  };

  // ================= COLUMNS =================
  const columns = [
    {
      field: "preventiveReason",
      headerName: "Preventive Reason",
      width: 220,
    },

    {
      field: "machineGroup",
      headerName: "Machine / Group",
      width: 220,
    },

    {
      field: "frequency",
      headerName: "Frequency",
      width: 180,
    },

    {
      field: "employee",
      headerName: "Employee",
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
              name: "Preventive Scheduling",
            },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Controls */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <SearchFilter
            searchValue={searchQuery}
            setSearchValue={setSearchQuery}
            searchColumn={searchColumn}
            setSearchColumn={setSearchColumn}
            columnOptions={[
              {
                value: "preventiveReason",
                label: "Preventive Reason",
              },
              {
                value: "machineGroup",
                label: "Machine / Group",
              },
              {
                value: "frequency",
                label: "Frequency",
              },
              {
                value: "employee",
                label: "Employee",
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
        <Box
          sx={{
            height: 500,
            width: "100%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}
