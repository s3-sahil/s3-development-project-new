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
import { MachineAssetGroupPaginationAPI } from "app/utils/ProductionMaterialServices";


export default function MachineAssetGroupTable() {
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

      const response = await MachineAssetGroupPaginationAPI(
        "MACHINE_ASSET_GROUP_MASTER",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.Group_Code || index + 1,

          type: item.Type || "",
          groupCode: item.Group_Code || "",
          groupName: item.Group_Name || "",
          machineHrRate: item.Machine_Hr_Rate || "",
          machineCount: item.Machine_Count || "",

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
    navigate(`/material/production-machine-asset-group-form/edit/${row.id}`, {
      state: row.original,
    });
  };

  // ================= COLUMNS =================

  const columns = [
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },
    {
      field: "groupCode",
      headerName: "Group Code",
      width: 180,
    },
    {
      field: "groupName",
      headerName: "Group Name",
      width: 220,
    },
    {
      field: "machineHrRate",
      headerName: "Machine Hr. Rate",
      width: 180,
    },
    {
      field: "machineCount",
      headerName: "Machine Count",
      width: 180,
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
            { name: "Machine/Asset Group Details" },
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
                value: "Group_Code",
                label: "Group Code",
              },
              {
                value: "Group_Name",
                label: "Group Name",
              },
              {
                value: "Type",
                label: "Type",
              },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/production-machine-asset-group-form/add")
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