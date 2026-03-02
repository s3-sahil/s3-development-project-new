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
import { useState } from "react";

export default function ActivityReportTable() {
  const navigate = useNavigate();

  const [rows] = useState([
    {
      id: 1,
      activityName: "Sahil Test",
      functionName: "PAYROLL",
      menuType: "ALL",
      menuLevel: "Main",
    },
  ]);

  const columns = [
    { field: "activityName", headerName: "Function", flex: 1 },
    { field: "functionName", headerName: "Object Name", flex: 1 },
    { field: "menuLevel", headerName: "Menu Level", flex: 1 },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 120,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <>
    //       <Tooltip title="Edit">
    //         <IconButton
    //           onClick={() =>
    //             navigate(`/sysadmin/activity-form-rights-form/edit/${params.row.id}`, {
    //               state: params.row,
    //             })
    //           }
    //         >
    //           <Icon color="primary">edit</Icon>
    //         </IconButton>
    //       </Tooltip>

    //       <Tooltip title="Delete">
    //         <IconButton>
    //           <Icon color="error">delete</Icon>
    //         </IconButton>
    //       </Tooltip>
    //     </>
    //   ),
    // },
  ];

  return (
    <Container maxWidth="xl">
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "System Admin" },
            { name: "Activity Form Rights" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          {/* <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/sysadmin/activity-form-rights-form/add")
            }
          >
            New
          </Button> */}
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
          />
        </Box>
      </Stack>
    </Container>
  );
}