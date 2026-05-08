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
import { advance_master_PaginationAPI } from "app/utils/authServices";

export default function EmployeeAdvanceTable() {
const navigate = useNavigate();
        const [rows, setRows] = useState([]);
        const [page, setPage] = useState(0); 
        const [pageSize, setPageSize] = useState(10);
        const [rowCount, setRowCount] = useState(0);
        const [loading, setLoading] = useState(false);
      
        const loadadvance_master = async () => {
          setLoading(true);
          const res = await advance_master_PaginationAPI(
            "advance_master",
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
          loadadvance_master();
        }, [page, pageSize]);
        
        const handleDelete = async (id) => {
          if (window.confirm("Are you sure you want to delete this advance_master?")) {
            try {
              await deleteadvance_master(id);
              loadadvance_master();
              alert("advance_master deleted successfully.");
            } catch (error) {
              console.error("Delete Error:", error);
              alert("Failed to delete advance_master.");
            }
          }
        };

  const columns = [
    { field: "empNo", headerName: "Employee No", flex: 1 },
    { field: "empName", headerName: "Employee Name", flex: 2 },
    { field: "subCode", headerName: "Sub Code", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-employee-advance-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "Employee Advance Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-employee-advance-form/add")}
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