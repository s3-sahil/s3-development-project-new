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
import { SupplierSchedulePaginationAPI } from "app/utils/materialTransactionServices";

export default function SupplierScheduleTable() {
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

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await SupplierSchedulePaginationAPI(
        "supplier_schedule",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response?.Data) {
        const mappedRows = response.Data.map((item, index) => ({
          id: item.Schedule_No || index + 1,
          scheduleNo: item.Schedule_No || "",
          date: item.Schedule_Date
            ? item.Schedule_Date.split("T")[0]
            : "",
          supplierCode: item.Supplier_Code || "",
          poNo: item.PO_No || "",
          itemCode: item.Item_Code || "",
          quantity: item.Quantity || 0,
          uom: item.UOM || "",
          deliveryDate: item.Delivery_Date
            ? item.Delivery_Date.split("T")[0]
            : "",
          status: item.Status || "Pending",
          original: item,
        }));

        setRows(mappedRows);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Supplier Schedule fetch error:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  // ---------------- COLUMNS ----------------
  const columns = [
    { field: "scheduleNo", headerName: "Schedule No.", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "supplierCode", headerName: "Supplier Code", flex: 1 },
    { field: "poNo", headerName: "PO No.", flex: 1 },
    { field: "itemCode", headerName: "Item Code", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "uom", headerName: "UOM", flex: 1 },
    { field: "deliveryDate", headerName: "Delivery Date", flex: 1 },
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
                `/material/material-supplier-schedule-form/edit/${params.row.id}`,
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
            { name: "Supplier Schedule" },
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
              { value: "Schedule_No", label: "Schedule No" },
              { value: "Supplier_Code", label: "Supplier Code" },
              { value: "PO_No", label: "PO No" },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-supplier-schedule-form/add")
            }
          >
            New
          </Button>
        </Box>

        {/* Table */}
        <Box sx={{ height: 520, width: "100%" }}>
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