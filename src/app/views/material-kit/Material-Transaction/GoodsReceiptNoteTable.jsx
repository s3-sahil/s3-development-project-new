import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GoodsReceiptNoteTableAPI } from "app/utils/materialMaterialServices";
import SearchFilter from "../SearchFilter";

export default function GoodsReceiptNoteTable() {
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
      const response = await GoodsReceiptNoteTableAPI(
        "goods_receipt_note",
        paginationModel.page + 1,
        paginationModel.pageSize,
        searchColumn,
        searchQuery,
      );

      if (response && response.Data) {
        const mappedData = response.Data.map((row, index) => ({
          ...row,
          id: `${row.grnNo || index}_${index}`,
        }));

        setRows(mappedData);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel, searchQuery, searchColumn]);

  const columns = [
    { field: "grnNo", headerName: "GRN No.", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "supplier", headerName: "Supplier", flex: 1.5 },
    { field: "poNo", headerName: "PO No.", flex: 1 },
    { field: "challanNo", headerName: "Challan No.", flex: 1 },
    { field: "invNo", headerName: "Invoice No.", flex: 1 },
    { field: "itemCode", headerName: "Item Code", flex: 1 },
    { field: "itemName", headerName: "Item Name", flex: 1.5 },
    { field: "challanQty", headerName: "Challan Qty", flex: 1 },
    { field: "actualQty", headerName: "Actual Qty", flex: 1 },
    { field: "uom", headerName: "UOM", flex: 1 },
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
                `/material/material-goods-receipt-note-form/edit/${params.row.id}`,
                {
                  state: params.row,
                },
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
          routeSegments={[{ name: "Material" }, { name: "Goods Receipt Note" }]}
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
              { value: "grnNo", label: "GRN No" },
              { value: "supplier", label: "Supplier" },
              { value: "poNo", label: "PO No" },
              { value: "itemCode", label: "Item Code" },
            ]}
            onSearch={() => fetchData()}
          />

          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-goods-receipt-note-form/add")
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
