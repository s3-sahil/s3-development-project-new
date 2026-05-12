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

import { WipMaterialAdjustmentPaginationAPI } from "app/utils/materialService";

export default function WipMaterialAdjustmentTable() {
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

      const response = await WipMaterialAdjustmentPaginationAPI(
        "vwip_material_adjustment",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.id || index + 1,
          adjustmentNo: item.Adjustment_No || "",
          date: item.Adjustment_Date
            ? item.Adjustment_Date.split("T")[0]
            : "",
          department: item.Department || "",
          itemCode: item.Item_Code || "",
          quantity: item.Quantity || 0,
          uom: item.UOM || "",
          status: item.Status || "Pending",
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

  // ================= COLUMNS =================
  const columns = [
    {
      field: "adjustmentNo",
      headerName: "Adjustment No.",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "itemCode",
      headerName: "Item Code",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "uom",
      headerName: "UOM",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
              navigate(
                `/material/material-wip-material-adjustment-form/edit/${params.row.id}`,
                {
                  state: params.row.original,
                }
              )
            }
          >
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
            { name: "Material" },
            { name: "WIP Material Adjustment" },
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
                value: "Adjustment_No",
                label: "Adjustment No",
              },
              {
                value: "Department",
                label: "Department",
              },
              {
                value: "Item_Code",
                label: "Item Code",
              },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-wip-material-adjustment-form/add")
            }
          >
            New
          </Button>
        </Box>

        {/* Table */}
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