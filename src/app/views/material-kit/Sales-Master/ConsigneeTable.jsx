import {
  Container,
  Icon,
  IconButton,
  Tooltip,
  Button,TextField,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ConsigneeTablePaginationAPI } from "app/utils/authServices";

export default function ConsigneeTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); 
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // UI-only mock rows
  
    const load_ConsigneeTable = async () => {
      setLoading(true);
      const res = await ConsigneeTablePaginationAPI(
        "Cust_Consignee",
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
      load_ConsigneeTable();
    }, [page, pageSize]);
  
    const handleAdd = () => {
      navigate("/material/sales-consignee-form/add");
    };

    const handleEdit = (row) => {
      navigate(
        `/material/sales-consignee-form/edit/${row.cust_code}/${row.Con_code}`,
        {
          state: row,
        }
      );
  };

  const columns = [
    { field: "cust_code", headerName: "Costomer Code", flex: 1 },
    { field: "Con_code", headerName: "Consignee Code", flex: 1 },
    { field: "cname", headerName: "Name", flex: 1 },
    { field: "cadd1", headerName: "Address", flex: 1 },
    { field: "phone", headerName: "Phone No", flex: 1 },
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
            <IconButton>
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
        <Breadcrumb routeSegments={[{ name: "Master" }, { name: "Consignee" }]} />
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Search Section */}
          <Box display="flex" gap={2}>
            <TextField
              size="small"
              placeholder="Search..."
            />
            <TextField
              size="small"
              select
              defaultValue=""
              sx={{ width: 180 }}
            >
              <MenuItem value="">Select Column</MenuItem>
              <MenuItem value="cust_code">cust_code</MenuItem>
              <MenuItem value="cname">cname</MenuItem>
            </TextField>
            <Button variant="contained">Search</Button>
          </Box>
        </Box>
        <Box sx={{ height: 500, width: "100%" }}>
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
