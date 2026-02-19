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

export default function PaymentConditionsTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      paymentCode: "PC001",
      description: "Advance with Inspection",
      advanceApplicable: "Yes",
      inspectionDate: "Yes",
      lcApplicable: "No",
      invoiceDate: "Yes",
    },
    {
      id: 2,
      paymentCode: "PC002",
      description: "LC Applicable Only",
      advanceApplicable: "No",
      inspectionDate: "No",
      lcApplicable: "Yes",
      invoiceDate: "No",
    },
  ];

  const columns = [
    { field: "paymentCode", headerName: "Payment Code", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "advanceApplicable", headerName: "Advance Applicable", width: 180 },
    { field: "inspectionDate", headerName: "Inspection Date", width: 180 },
    { field: "lcApplicable", headerName: "LC Applicable", width: 150 },
    { field: "invoiceDate", headerName: "Invoice Date", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/finance/payment-conditions-form/edit/${params.row.id}`, {
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
        <Breadcrumb
          routeSegments={[
            { name: "Finance" },
            { name: "Payment Conditions Detail" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/finance/payment-conditions-form/add")
            }
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