import { Container, Box, Icon, IconButton, Tooltip, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProjectExecutionPlan_PaginationAPI, ProjectExecutionPlan_Delete } from "app/utils/authServices";

const ProjectExecutionPlanTable = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);


  const loadProjectExecutionPlan = async () => {
    setLoading(true);
    const res = await ProjectExecutionPlan_PaginationAPI(
      "Project_execution_Head",
      page + 1, 
      pageSize
    );

    if (res?.Data) {
      setRows(
        res.Data.map((item, index) => ({
          id: item.id || index + 1, 
          ...item,
        }))
      );
      setRowCount(res.TotalCount || 0);
    }
    setLoading(false);
  };

 useEffect(() => {
    loadProjectExecutionPlan();
  }, [page, pageSize]);

  const handleAdd = () => {
    navigate("/Sales/material/salesman/add");
  };

  const handleEdit = (row) => {
    navigate(`/Sales/material/salesman/edit/${row.Emp_no}`, {
      state: { employeeCode: row.Emp_no },
    });
  };

  const handleDelete = async (row) => {
    if (window.confirm("Are you sure you want to delete this Project Execution Plan?")) {
      try {
        debugger;
        await ProjectExecutionPlan_Delete(row);
        loadProjectExecutionPlan();
        alert("Project Execution Plan deleted successfully.");
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete Project Execution Plan.");
      }
    }
  };
  
  const columns = [
    { field: "cust_code", headerName: "Customer", flex: 1 },
    { field: "po_no", headerName: "PO No", flex: 1 },
    { field: "po_Dt", headerName: "PO Date", flex: 1 },
    { field: "po_id", headerName: "PO Id", flex: 1 },
    { field: "item_Code", headerName: "Item Code", flex: 1 },
    { field: "Proj_code", headerName: "Project Code", flex: 1 },
    { field: "profcen_cd", headerName: "Division", flex: 1 },
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
                navigate(`/material/sales-project-execution-plan-form/edit/${params.row.cust_code}`, {
                  state: params.row,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row)}>
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
        <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    rowCount={rowCount}
                    paginationMode="server" 
                    pageSizeOptions={[5, 10, 20]}
                    paginationModel={{ page, pageSize }}
                    onPaginationModelChange={(model) => {
                      setPage(model.page);
                      setPageSize(model.pageSize);
                    }}
                  />
      </Box>
    </Container>
  );
};

export default ProjectExecutionPlanTable;
