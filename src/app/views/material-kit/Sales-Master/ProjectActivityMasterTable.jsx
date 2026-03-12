import { Box, Button, Container, Icon, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectActivityPaginationAPI } from "app/utils/authServices";
import { useEffect, useState } from "react";

export default function ProjectActivityMasterTable() {

  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(11);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadProjectActivity = async () => {
    setLoading(true);
    const res = await ProjectActivityPaginationAPI(
      "Project_activity",
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
    loadProjectActivity();
  }, [page, pageSize]);

  const handleAdd = () => {
    navigate("/material/salesman/add");
  }

  const handleEdit = (row) => {
    navigate(`/material/salesman/edit/${row.Activity_code}`, {
      state: row,
    });
  };

  const handleDelete = (row) => {
    console.log("Delete salesman:", row.Activity_code);
  };


  const columns = [
    { field: "Activity_code", headerName: "Activity Code", flex: 1 },
    { field: "Description", headerName: "Activity Description", flex: 2 },
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
        <Breadcrumb routeSegments={[{ name: "Planning" }, { name: "Project Activity Master" }]} />
      </Box>

      <Stack elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/sales-project-activity-master-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid 
          //rows={rows} columns={columns} disableRowSelectionOnClick 
          
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


