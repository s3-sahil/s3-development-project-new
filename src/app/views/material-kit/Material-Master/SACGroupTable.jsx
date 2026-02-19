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

export default function SACGroupTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      headingNo: "9983",
      groupCode: "S001",
      groupDescription: "Professional Services",
      flag: "Service",
    },
    {
      id: 2,
      headingNo: "9954",
      groupCode: "M001",
      groupDescription: "Construction Services",
      flag: "Manufacturing",
    },
  ];

  const columns = [
    { field: "headingNo", headerName: "Heading No.", width: 150 },
    { field: "groupCode", headerName: "Group Code", width: 150 },
    { field: "groupDescription", headerName: "Group Description", width: 250 },
    { field: "flag", headerName: "Category", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-SAC-group-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "SAC Group Master" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-SAC-group-form/add")}
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