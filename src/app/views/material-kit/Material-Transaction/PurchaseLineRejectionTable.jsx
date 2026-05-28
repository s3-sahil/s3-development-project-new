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
import { PurchaseLineRejectionPaginationAPI } from "app/utils/materialTransactionServices";

export default function PurchaseLineRejectionTable() {
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
      const response = await PurchaseLineRejectionPaginationAPI(
        "purchase_line_rejection",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery
      );

      if (response && response.Data) {
        const mappedData = response.Data.map((row, index) => ({
          id: `${row.Rejection_No}_${index}`,
          rejectionNo: row.Rejection_No,
          date: row.Rejection_Date
            ? row.Rejection_Date.split("T")[0]
            : "",
          supplier: row.Supplier_Name,
          poNo: row.PO_No,
          itemCode: row.Item_Code,
          quantity: row.Quantity,
          rejectedQty: row.Rejected_Qty,
          reason: row.Reason,
          status: row.Status || "Pending",
          original: row,
        }));

        setRows(mappedData);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error(
        "Error fetching purchase line rejection:",
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
    { field: "rejectionNo", headerName: "Rejection No.", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "supplier", headerName: "Supplier", flex: 1 },
    { field: "poNo", headerName: "PO No.", flex: 1 },
    { field: "itemCode", headerName: "Item Code", flex: 1 },
    { field: "quantity", headerName: "Quantity", flex: 1 },
    { field: "rejectedQty", headerName: "Rejected Qty", flex: 1 },
    { field: "reason", headerName: "Reason", flex: 1 },
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
                `/material/material-purchase-line-rejection-form/edit/${params.row.id}`,
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
            { name: "Purchase Line Rejection" },
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
              { value: "rejection_No", label: "Rejection No" },
              { value: "supplier_Name", label: "Supplier" },
              { value: "item_Code", label: "Item Code" },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate(
                "/material/material-purchase-line-rejection-form/add"
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