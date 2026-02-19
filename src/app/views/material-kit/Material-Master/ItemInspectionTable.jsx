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

export default function ItemInspectionTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      productCode: "PRD001",
      operationCode: "OP01",
      serialNo: "001",
      dimensionMin: "10",
      dimensionMax: "12",
      parameter: "Length",
      tolerancePositive: "0.5",
      toleranceNegative: "0.2",
      remark: "Check surface finish",
    },
    {
      id: 2,
      productCode: "PRD002",
      operationCode: "OP02",
      serialNo: "002",
      dimensionMin: "5",
      dimensionMax: "6",
      parameter: "Width",
      tolerancePositive: "0.3",
      toleranceNegative: "0.1",
      remark: "Critical dimension",
    },
  ];

  const columns = [
    { field: "productCode", headerName: "Product Code", width: 150 },
    { field: "operationCode", headerName: "Operation Code", width: 150 },
    { field: "serialNo", headerName: "Serial No", width: 120 },
    { field: "dimensionMin", headerName: "Dimension Min", width: 150 },
    { field: "dimensionMax", headerName: "Dimension Max", width: 150 },
    { field: "parameter", headerName: "Parameter", width: 150 },
    { field: "tolerancePositive", headerName: "+Ve Tolerance", width: 150 },
    { field: "toleranceNegative", headerName: "-Ve Tolerance", width: 150 },
    { field: "remark", headerName: "Remark", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/tqm/item-inspection-form/edit/${params.row.id}`, {
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
            { name: "Material" },
            { name: "Item Inspection Parameter Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/tqm/item-inspection-form/add")
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