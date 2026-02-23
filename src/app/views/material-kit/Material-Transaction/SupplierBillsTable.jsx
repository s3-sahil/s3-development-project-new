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

export default function SupplierBillsTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      supplierCode: "SUP001",
      docNo: "DOC001",
      invoiceNo: "INV001",
      billAmount: 50000,
      cgst: 2500,
      sgst: 2500,
      status: "Pending",
    },
    {
      id: 2,
      supplierCode: "SUP002",
      docNo: "DOC002",
      invoiceNo: "INV002",
      billAmount: 75000,
      cgst: 3750,
      sgst: 3750,
      status: "Approved",
    },
  ];

  const columns = [
    { field: "supplierCode", headerName: "Supplier Code", width: 180 },
    { field: "docNo", headerName: "Doc No.", width: 150 },
    { field: "invoiceNo", headerName: "Invoice No.", width: 180 },
    { field: "billAmount", headerName: "Bill Amount", width: 150 },
    { field: "cgst", headerName: "CGST", width: 120 },
    { field: "sgst", headerName: "SGST", width: 120 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-supplier-bills-form/edit/${params.row.id}`, {
                state: params.row,
              })
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Supplier Bills" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-supplier-bills-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 420 }}>
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Stack>
    </Container>
  );
}