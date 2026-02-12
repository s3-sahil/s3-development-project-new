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

export default function FullFinalTable() {
  const navigate = useNavigate();

  // 🔹 Hardcoded Data
  const rows = [
    {
      id: 1,
      employeeNo: "00059",
      fullFinalDate: "2012-04-30",
      reason: "-",
      otherRecovery1: "-",
      remark1: ".",
      division: "1",
    },
    {
      id: 2,
      employeeNo: "00143",
      fullFinalDate: "2015-04-02",
      reason: "Resignation",
      otherRecovery1: "-",
      remark1: ".",
      division: "2",
    },
  ];

  const handleEdit = (row) => {
    navigate(`/material/payroll-full-final-form/edit/${row.id}`, { state: row });
  };

  const handleDelete = (id) => {
    console.log("Delete record:", id);
  };

  const handleAddNew = () => {
    navigate("/material/payroll-full-final-form/add");
  };

  const columns = [
    { field: "employeeNo", headerName: "Employee No", width: 150 },
    { field: "fullFinalDate", headerName: "Full & Final Date", width: 180 },
    { field: "reason", headerName: "Reason of Leaving", width: 200 },
    { field: "otherRecovery1", headerName: "Other Recovery 1", width: 160 },
    { field: "remark1", headerName: "Remark 1", width: 150 },
    { field: "division", headerName: "Division", width: 120 },

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
            <IconButton onClick={() => handleDelete(params.row.id)}>
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
            { name: "Payroll" },
            { name: "Full and Final Entry" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddNew}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 420, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </Box>
      </Stack>
    </Container>
  );
}
