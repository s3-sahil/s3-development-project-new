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

export default function SACGroupMasterTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      type: "Service",
      headingNo: "001",
      groupCode: "SRV001",
      groupDescription: "Consulting Services",
    },
    {
      id: 2,
      type: "Manufacturing",
      headingNo: "002",
      groupCode: "MFG001",
      groupDescription: "Steel Fabrication",
    },
  ];

  const columns = [
    { field: "type", headerName: "Type", width: 150 },
    { field: "headingNo", headerName: "Heading No", width: 150 },
    { field: "groupCode", headerName: "Group Code", width: 150 },
    { field: "groupDescription", headerName: "Group Description", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-SAC-group-master-form/edit/${params.row.id}`, {
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
            { name: "SAC Group Master" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/material-SAC-group-master-form/add")
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