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

export default function DistrictDetailsTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      country: "India",
      state: "Gujarat",
      districtCode: "33",
      districtName: "Surat",
    },
    {
      id: 2,
      country: "India",
      state: "Maharashtra",
      districtCode: "22",
      districtName: "Buldhana",
    },
  ];

  const columns = [
    { field: "country", headerName: "Country", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "districtCode", headerName: "District Code", width: 150 },
    { field: "districtName", headerName: "District Name", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-district-details-form/edit/${params.row.id}`, {
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
            { name: "District Details" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-district-details-form/add")
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