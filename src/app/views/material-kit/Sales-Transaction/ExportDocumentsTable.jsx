import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExportDocumentsList } from "app/utils/authServices";

export default function ExportDocumentsTable() {

  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  // ===== Fetch Data =====
  const fetchExportDocuments = async () => {
    try {

      const data = await getExportDocumentsList();

      setRows(data || []);

    } catch (error) {
      console.error("Fetch Error:", error.message);
    }
  };

  useEffect(() => {
    fetchExportDocuments();
  }, []);

  // ===== Navigation =====
  const handleAdd = () => {
    navigate("/material/sales-export-documents-form/add");
  };

  const handleEdit = (row) => {
    navigate(`/material/sales-export-documents-form/edit/${row.id}`, {
      state: row,
    });
  };

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const columns = [
    {
      field: "functionName",
      headerName: "Function",
      flex: 1,
    },
    {
      field: "objectName",
      headerName: "Object Name",
      flex: 1,
    },
    {
      field: "newAccess",
      headerName: "New",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.value ? <Icon color="success">check</Icon> : null,
    },
    {
      field: "editAccess",
      headerName: "Edit",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.value ? <Icon color="primary">check</Icon> : null,
    },
    {
      field: "deleteAccess",
      headerName: "Delete",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.value ? <Icon color="error">check</Icon> : null,
    },
    {
      field: "viewAccess",
      headerName: "View",
      width: 90,
      align: "center",
      headerAlign: "center",
      renderCell: (params) =>
        params.value ? <Icon color="action">check</Icon> : null,
    },
    {
      field: "menuLevel",
      headerName: "Menu Level",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <>
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
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">

      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Sales" },
            { name: "Export Documents" },
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

        <Box sx={{ height: 420, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
          />
        </Box>

      </Stack>

    </Container>
  );
}