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

export default function HSNTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      hsnCode: "7207",
      name: "Iron & Steel",
      flag: "Manufacturing",
      notificationNo: "12/2017",
      uom: "KG",
    },
    {
      id: 2,
      hsnCode: "9983",
      name: "Other Professional Services",
      flag: "Service",
      notificationNo: "20/2019",
      uom: "NOS",
    },
  ];

  const columns = [
    { field: "hsnCode", headerName: "HSN/SAC Code", width: 150 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "flag", headerName: "HSN Flag", width: 150 },
    { field: "notificationNo", headerName: "Notification No.", width: 200 },
    { field: "uom", headerName: "UOM", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-HSN-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "HSN/SAC Master" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-HSN-form/add")}
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