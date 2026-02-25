import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigation hook

export default function LeaveApplicationTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      id: 1,
      empNo: "EMP001",
      empName: "John Doe",
      leaveType: "CL",
      requestDate: "01/02/2026",
      leaveDate: "02/02/2026",
      leaveDay: "1",
      reason: "Personal",
      apprFlg: "Y",
    },
    {
      id: 2,
      empNo: "EMP002",
      empName: "Jane Smith",
      leaveType: "SL",
      requestDate: "01/02/2026",
      leaveDate: "03/02/2026",
      leaveDay: "2",
      reason: "Medical",
      apprFlg: "P",
    },
  ]);

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {
    // navigate to edit form with row data
    navigate(`/material/TMS-leave-application-form/edit/${row.id}`, { state: row });
  };

  const columns = [
    { field: "empNo", headerName: "Emp No", flex: 1 },
    { field: "empName", headerName: "Emp Name", flex: 2 },
    { field: "leaveType", headerName: "Leave Type", flex: 1 },
    { field: "requestDate", headerName: "Request Date", flex: 1 },
    { field: "leaveDate", headerName: "Leave Date", flex: 1 },
    { field: "leaveDay", headerName: "Leave Day", flex: 1 },
    { field: "reason", headerName: "Reason", flex: 2 },
    { field: "apprFlg", headerName: "Appr Flg", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
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
        </Stack>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb" mb={2}>
        <Breadcrumb
          routeSegments={[{ name: "TMS" }, { name: "Leave Application" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/TMS-leave-application-form/add")}
          >
            New
          </Button>
        </Box>

        <Box
          sx={{
            height: 500,
            background: "#fff",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>
      </Stack>
    </Container>
  );
}
