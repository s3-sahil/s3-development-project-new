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

export default function InspectionParameterTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  // 🔹 Load Data (Replace with API later)
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        parameter: "Length",
        dimension: "Yes",
      },
      {
        id: 2,
        parameter: "Width",
        dimension: "Yes",
      },
      {
        id: 3,
        parameter: "Color",
        dimension: "No",
      },
    ];

    setRows(mockData);
  }, []);

  // 🔹 Delete
  const handleDelete = (id) => {
    const confirm = window.confirm("Delete this record?");
    if (!confirm) return;

    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  // 🔹 Columns
  const columns = [
    {
      field: "parameter",
      headerName: "Parameter",
      flex: 1,
    },
    {
      field: "dimension",
      headerName: "Dimension Applicable",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          {/* EDIT */}
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/Inspection-Parameter-form/edit/${params.row.id}`,
                  { state: params.row }
                )
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
          </Tooltip>

          {/* DELETE */}
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
            { name: "Material" },
            { name: "Inspection Parameter" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/Inspection-Parameter-form/add")
            }
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 450 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            autoHeight
          />
        </Box>
      </Stack>
    </Container>
  );
}