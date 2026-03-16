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
import { getDailyActivityPlanList, deleteDailyActivityPlan } from "app/utils/authServices";

export default function DailyActivityPlanTable() {

  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const fetchData = async () => {

    try {

      const data = await getDailyActivityPlanList();

      setRows(data || []);

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {

    try {

      await deleteDailyActivityPlan(id);

      alert("Record Deleted");

      fetchData();

    } catch (error) {
      console.error(error.message);
    }
  };

  const columns = [

    { field: "activityNo", headerName: "Activity No", flex: 1 },

    { field: "employeeNo", headerName: "Employee No", flex: 1 },

    { field: "visitDate", headerName: "Visit Date", flex: 1 },

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
            <IconButton
              onClick={() =>
                navigate(`/material/sales-daily-activity-plan-form/edit/${params.row.id}`)
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDelete(params.row.id)}
            >
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
            onClick={() =>
              navigate("/material/sales-daily-activity-plan-form/add")
            }
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </Box>

      </Stack>

    </Container>
  );
}