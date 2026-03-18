import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button
} from "@mui/material";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DailyActivityPlanPaginationAPI,
  getDailyActivityPlanDetailsAPI,
  deleteDailyActivityPlan,
} from "app/utils/authServices"; // Assuming these APIs exist

export default function DailyActivityPlanTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Assuming the table name is 'daily_activity_plan' for the pagination API
      const response = await DailyActivityPlanPaginationAPI(
        "daily_activity_plan", // This might need to be adjusted
        paginationModel.page + 1,
        paginationModel.pageSize
      );
      if (response?.Data) {
        setRows(response.Data);
        setRowCount(response.TotalCount || 0);
      }
    } catch (error) {
      console.error(error.message);
      setRows([]);
      setRowCount(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  const handleAdd = () => {
    navigate("/material/sales-daily-activity-plan-form/add");
  };

  const handleEdit = async (row) => {
    setLoading(true);
    try {
      // Assuming the details API takes the activityNo
      const response = await getDailyActivityPlanDetailsAPI({
        activityNo: row.activityNo,
      });

      if (response) {
        navigate(`/material/sales-daily-activity-plan-form/edit/${row.activityNo}`, {
          state: { activityPlanDetails: response },
        });
      }
    } catch (e) {
      console.error("Failed to fetch activity plan details:", e);
    }
    setLoading(false);
  };

  const handleDelete = async (activityNo) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await deleteDailyActivityPlan(activityNo);
      alert("Record Deleted");
      fetchData();
      } catch (error) {
        console.error(error.message);
        alert("Failed to delete record.");
      }
    }
  };

  const columns = [

    { field: "activityNo", headerName: "Activity No", flex: 1 },

    { field: "employeeNo", headerName: "Employee No", flex: 1 },

    {
      field: "visitDate",
      headerName: "Visit Date",
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value).toLocaleDateString(),
    },

    { field: "visitingTo", headerName: "Visiting To", flex: 1.5 },

    { field: "visitingPerson", headerName: "Visiting Person", flex: 1.5 },

    { field: "visitStatus", headerName: "Status", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEdit(params.row)}>
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(params.row.activityNo)}>
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
            { name: "Planning" },
            { name: "Daily Activity Plan" }
          ]}
        />
      </Box>

      <Stack spacing={3}>

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.activityNo} // Use activityNo as the unique ID
            loading={loading}
            rowCount={rowCount}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}