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

export default function MaterialIssueTable() {
  const navigate = useNavigate();

  const rows = [
    {
      id: 1,
      issueNo: "MI001",
      issueDate: "2026-02-19",
      department: "Production",
      project: "Project A",
      itemCode: "ST001",
      quantity: 100,
      uom: "Kg",
      avlQty: 500,
      status: "Pending",
    },
    {
      id: 2,
      issueNo: "MI002",
      issueDate: "2026-02-18",
      department: "Maintenance",
      project: "Project B",
      itemCode: "CP002",
      quantity: 50,
      uom: "Meter",
      avlQty: 200,
      status: "Issued",
    },
  ];

  const columns = [
    { field: "issueNo", headerName: "Issue No.", width: 150 },
    { field: "issueDate", headerName: "Issue Date", width: 150 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "project", headerName: "Project", width: 200 },
    { field: "itemCode", headerName: "Item Code", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "uom", headerName: "UOM", width: 120 },
    { field: "avlQty", headerName: "Available Qty", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton
            onClick={() =>
              navigate(`/material/material-issue-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Material" }, { name: "Material Issue" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/material-issue-form/add")}
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