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
import { useEffect, useState } from "react";
import { SubGroup_master_PaginationAPI } from "app/utils/authServices";

export default function SubGroupDetailsTable() {
    const navigate = useNavigate();
      const [rows, setRows] = useState([]);
      const [page, setPage] = useState(0); 
      const [pageSize, setPageSize] = useState(10);
      const [rowCount, setRowCount] = useState(0);
      const [loading, setLoading] = useState(false);
    
      const loadSubGroup_master = async () => {
        setLoading(true);
        const res = await SubGroup_master_PaginationAPI(
          "SubGroup_master",
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
        loadSubGroup_master();
      }, [page, pageSize]);
      
      const handleDelete = async (id) => {debugger
        if (window.confirm("Are you sure you want to delete this SubGroup_master?")) {
          try {
            await deleteSubGroup_master(id);
            loadSubGroup_master();
            alert("SubGroup_master deleted successfully.");
          } catch (error) {
            console.error("Delete Error:", error);
            alert("Failed to delete SubGroup_master.");
          }
        }
      };

  const columns = [
    { field: "SubGroup_code", headerName: "Sub Group Code", flex: 1 },
    { field: "Group_code", headerName: "Group Code", flex: 1 },
    { field: "SubGroup_desc", headerName: "Sub Group Desc", flex: 2 },
    { field: "PlanAndMachinary", headerName: "Plant And Machinery", flex: 1, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: "PlanAndMachinary_new", headerName: "Old Plant & Machinery", flex: 1, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: "PlanAndMachinary_Old", headerName: "New Plant & Machinery", flex: 1, renderCell: (params) => (params.value ? "Yes" : "No") },
    { field: "SubSubGroupFlag", headerName: "Sub Group Flag", flex: 1, renderCell: (params) => (params.value ? "Yes" : "No") },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-sub-group-details-form/edit/${params.row.id}`, {
                  state: params.row,
                })
              }
            >
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
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Sub Group Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-sub-group-details-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 620 }}>
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
      </Stack>
    </Container>
  );
}