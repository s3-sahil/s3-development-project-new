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

export default function GSTDetailTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      taxType: "CGST",
      taxCode: "C01",
      taxName: "CGST",
      taxPercent: 14,
      wefMonth: "07",
      wefYear: "2017",
      glCode: "102074",
      description: "CGST PAYABLE",
    },
    {
      id: 2,
      taxType: "SGST",
      taxCode: "S01",
      taxName: "SGST",
      taxPercent: 14,
      wefMonth: "07",
      wefYear: "2017",
      glCode: "102075",
      description: "SGST PAYABLE",
    },
  ];

  const columns = [
    { field: "taxType", headerName: "Tax Type", width: 120 },
    { field: "taxCode", headerName: "Tax Code", width: 120 },
    { field: "taxName", headerName: "Tax Name", width: 150 },
    { field: "taxPercent", headerName: "Tax (%)", width: 120 },
    { field: "wefMonth", headerName: "WEF (MM)", width: 120 },
    { field: "wefYear", headerName: "WEF (YYYY)", width: 120 },
    { field: "glCode", headerName: "GL Code", width: 150 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-GST-detail-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "GST Detail" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-GST-detail-form/add")}
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