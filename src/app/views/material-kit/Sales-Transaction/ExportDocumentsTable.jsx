import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExportDocumentParameterPaginationAPI } from "app/utils/salesTransactionServices";

export default function ExportDocumentsTable() {

  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // ===== Fetch Data =====
  const fetchExportDocuments = async (pageNo, size) => {

    try {

      setLoading(true);

      const response = await ExportDocumentParameterPaginationAPI(
        "invoice_hed",
        pageNo + 1,
        size
      );

      setRows(response?.Data || []);
      setRowCount(response?.TotalCount || 0);

    } catch (error) {

      console.error("Fetch Error:", error.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchExportDocuments(page, pageSize);
  }, [page, pageSize]);

  // ===== Navigation =====

  const handleAdd = () => {
    navigate("/material/sales-export-documents-form/add");
  };

  const handleEdit = (row) => {
    navigate(`/material/sales-export-documents-form/edit/${row.INV_NO}`, {
      state: row,
    });
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  // ===== Columns =====

  const columns = [
    {
      field: "INV_NO",
      headerName: "Invoice No",
      width: 150,
    },
    {
      field: "INV_TYPE",
      headerName: "Invoice Type",
      width: 150,
    },
    {
      field: "SALES_TYPE",
      headerName: "Sales Type",
      width: 150,
    },
    {
      field: "CONSIN_NAME",
      headerName: "Customer",
      flex: 1,
    },
    {
      field: "CONSIN_CITY",
      headerName: "City",
      width: 130,
    },
    {
      field: "NET_AMT",
      headerName: "Net Amount",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.INV_NO)}>
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
          routeSegments={[
            { name: "Sales" },
            { name: "Export Documents" },
          ]}
        />
      </Box>

      <Stack spacing={3}>

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>

          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.INV_NO}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={{ page, pageSize }}
            pageSizeOptions={[5, 10, 20]}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
            disableRowSelectionOnClick
          />

        </Box>

      </Stack>

    </Container>
  );
}