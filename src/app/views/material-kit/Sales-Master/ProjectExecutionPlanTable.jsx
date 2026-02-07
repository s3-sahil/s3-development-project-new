import { Container, Box, Icon, IconButton, Tooltip, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProjectExecutionPlanTable = () => {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      customer: "ABC Industries",
      orderNo: "ORD-101",
      project: "Project Alpha",
      productName: "Machine X",
      deliveryDate: "2026-02-20",
      status: "Open",
    },
  ]);

  const columns = [
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "orderNo", headerName: "Order No", flex: 1 },
    { field: "project", headerName: "Project", flex: 1 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "deliveryDate", headerName: "Delivery Date", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/sales-project-execution-plan-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
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
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Project Execution Plan" }]} />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Icon>add</Icon>}
          onClick={() => navigate("/material/sales-project-execution-plan-form/add")}
        >
          New
        </Button>
      </Box>

      <Box sx={{ height: 520, width: "100%", background: "#fff", borderRadius: 2 }}>
        <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
      </Box>
    </Container>
  );
};

export default ProjectExecutionPlanTable;
