// ================= TABLE =================

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
import { MachineAssetDetailPaginationAPI } from "app/utils/ProductionMaterialServices";


export default function MachineAssetDetailTable() {
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

      const response = await MachineAssetDetailPaginationAPI(
        "MACHINE_ASSET_MASTER",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery,
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.Machine_No || index + 1,

          machineNo: item.Machine_No || "",
          machineName: item.Machine_Name || "",
          modelNo: item.Model_No || "",
          make: item.Make || "",
          capacity: item.Capacity || "",
          inUse: item.In_Use === true ? "Yes" : "No",

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
    navigate(`/material/production-machine-asset-detail-form/edit/${row.id}`, {
      state: row.original,
    });
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "machineNo",
      headerName: "Machine No",
      width: 150,
    },
    {
      field: "machineName",
      headerName: "Machine Name",
      width: 220,
    },
    {
      field: "modelNo",
      headerName: "Model No",
      width: 150,
    },
    {
      field: "make",
      headerName: "Make",
      width: 180,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      width: 150,
    },
    {
      field: "inUse",
      headerName: "In Use",
      width: 120,
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
            { name: "Machine/Asset Details" },
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
                value: "Machine_No",
                label: "Machine No",
              },
              {
                value: "Machine_Name",
                label: "Machine Name",
              },
              {
                value: "Model_No",
                label: "Model No",
              },
              {
                value: "Make",
                label: "Make",
              },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/production-machine-asset-detail-form/add")
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
