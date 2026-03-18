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
import { getEInvoiceListAPI } from "app/utils/authServices";

export default function UploadEInvoiceTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCountState, setRowCountState] = useState(0);

  const fetchEInvoices = async () => {
    setLoading(true);
    try {
      const response = await getEInvoiceListAPI(
        paginationModel.page + 1,
        paginationModel.pageSize
      );
      if (response && response.Data) {
        setRows(
          response.Data.map((row, index) => ({
            ...row,
            id: row.invoiceNo || index, // Ensure unique ID
          }))
        );
        setRowCountState(response.TotalCount || 0);
      } else {
        setRows([]);
        setRowCountState(0);
      }
    } catch (error) {
      console.error("Failed to fetch e-invoices:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEInvoices();
  }, [paginationModel]);

  const columns = [
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    { field: "customerName", headerName: "Customer Name", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton
              onClick={() =>
                navigate(`/material/sales-upload-e-invoice-form/edit/${params.row.id}`)
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "E-Invoice" }, { name: "Upload" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/sales-upload-e-invoice-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={rowCountState}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            paginationMode="server"
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}