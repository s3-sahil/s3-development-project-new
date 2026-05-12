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
import { useState, useEffect } from "react";
import { MaterialStockAdjustmentPaginationAPI } from "app/utils/materialMaterialServices";
import SearchFilter from "../SearchFilter";

export default function MaterialStockAdjustmentTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await MaterialStockAdjustmentPaginationAPI(
        "material_stock_adjustment",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response && response.Data) {
        const mappedData = response.Data.map((row, index) => ({
          ...row,
          id: `${row.adjustment_no}_${index}`,
        }));

        setRows(mappedData);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching Material Stock Adjustment:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  const columns = [
    { field: "adjustment_no", headerName: "Adjustment No.", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "project", headerName: "Project", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "item_code", headerName: "Item Code", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "uom", headerName: "UOM", flex: 1 },
    { field: "avl_stock", headerName: "Available Stock", flex: 1 },

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
                `/material/material-stock-adjustment-form/edit/${params.row.id}`,
                {
                  state: params.row,
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
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Material" },
            { name: "Stock Adjustment" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Search + Button */}
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
              { value: "adjustment_no", label: "Adjustment No" },
              { value: "project", label: "Project" },
              { value: "department", label: "Department" },
              { value: "item_code", label: "Item Code" },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-stock-adjustment-form/add")
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