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
import { SalesmanPaginationAPI } from "app/utils/authServices";


export default function SalesmanTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadSalesman = async () => {
    setLoading(true);
    const res = await SalesmanPaginationAPI(
      "salesman",
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
    loadSalesman();
  }, [page, pageSize]);

  const handleAdd = () => {
    navigate("/material/salesman/add");
  };

  const handleEdit = (row) => {
    navigate(`/material/salesman/edit/${row.Emp_no}`, {
      state: row,
    });
  };

  const handleDelete = (id) => {
    console.log("Delete salesman:", id);
  };

  const columns = [
    { field: "Emp_no", headerName: "Code", width: 140 },
    { field: "Sman_name", headerName: "Name", width: 180 },
    { field: "semail", headerName: "Email", width: 220 },
    { field: "scontact_no", headerName: "Contact No", width: 160 },
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
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <Icon color="error">delete</Icon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Master" }, { name: "Salesman" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAdd}
          >
            Add Salesman
          </Button>
        </Box>

        <Box sx={{ height: 420, width: "100%" }}>
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