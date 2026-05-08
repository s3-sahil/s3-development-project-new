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
import { deleteSchedule, FI_ScheduleDTLPaginationAPI } from "app/utils/authServices";


export default function ScheduleDetailsTable() {

    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0); 
    const [pageSize, setPageSize] = useState(10);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const loadSchedule = async () => {
      setLoading(true);
      const res = await FI_ScheduleDTLPaginationAPI(
        "sch",
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
      loadSchedule();
    }, [page, pageSize]);
  
    // const handleAdd = () => {
    //   navigate("/Sales/Master/ScheduleForm/add");
    // };
  
    // const handleEdit = (row) => {
    //   navigate(`/Sales/Master/ScheduleForm/edit/${row.Emp_no}`, {
    //     state: row,
    //   });
    // };
  
    const handleDelete = async (id) => {debugger
      if (window.confirm("Are you sure you want to delete this Schedule?")) {
        try {
          await deleteSchedule(id);
          loadSchedule();
          alert("Schedule deleted successfully.");
        } catch (error) {
          console.error("Delete Error:", error);
          alert("Failed to delete Schedule.");
        }
      }
    };
  

  const columns = [
    { field: "sch_no", headerName: "Schedule", flex: 1 },
    { field: "sch_desc", headerName: "Schedule Name", flex: 2 },
    { field: "sch_for", headerName: "GL Category", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-schedule-details-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Schedule Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-schedule-details-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 620 }}><DataGrid
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