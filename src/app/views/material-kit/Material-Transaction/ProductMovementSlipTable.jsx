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
import SearchFilter from "../SearchFilter";
import { ProductMovementSlipPaginationAPI } from "app/utils/materialTransactionServices";

export default function ProductMovementSlipTable() {
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

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await ProductMovementSlipPaginationAPI(
        "product_movement_slip",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response && response.Data) {
        const mappedData = response.Data.map((row, index) => ({
          id: `${row.Slip_No}_${index}`,
          slipNo: row.Slip_No,
          date: row.Slip_Date
            ? row.Slip_Date.split("T")[0]
            : "",
          fromLocation: row.From_Location,
          toLocation: row.To_Location,
          itemCode: row.Item_Code,
          quantity: row.Quantity,
          uom: row.UOM,
          transporter: row.Transporter,
          vehicleNo: row.Vehicle_No,
          status: row.Status || "Pending",
          original: row,
        }));

        setRows(mappedData);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error(
        "Error fetching product movement slip:",
        error
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  // Columns
  const columns = [
    { field: "slipNo", headerName: "Slip No.", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "fromLocation", headerName: "From Location", flex: 1 },
    { field: "toLocation", headerName: "To Location", flex: 1 },
    { field: "itemCode", headerName: "Item Code", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "uom", headerName: "UOM", flex: 1 },
    { field: "transporter", headerName: "Transporter", flex: 1 },
    { field: "vehicleNo", headerName: "Vehicle No.", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },

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
                `/material/material-product-movement-slip-form/edit/${params.row.id}`,
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
            { name: "Product Movement Slip" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        {/* Top Bar */}
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
              { value: "slip_No", label: "Slip No" },
              { value: "item_Code", label: "Item Code" },
              { value: "vehicle_No", label: "Vehicle No" },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate(
                "/material/material-product-movement-slip-form/add"
              )
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
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}