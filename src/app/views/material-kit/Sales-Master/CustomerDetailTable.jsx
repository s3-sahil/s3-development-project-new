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
import { deleteCustomerDetail, CUSTOMER_DETAILPaginationAPI } from "app/utils/authServices";

export default function CustomerDetailTable() {
    

  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
   
  const loadCustomerDetail = async () => {
    setLoading(true);
    const res = await CUSTOMER_DETAILPaginationAPI(
      "cust_mst",
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
    loadCustomerDetail();
  }, [page, pageSize]);

  
  const handleEdit = (row) => {
    navigate(`/material/customer/edit/${row.Cust_code}`, { state:row });    
  };

  const handleAdd = () => {
    navigate("/material/customer/add");
  };
      //state: { employeeCode: row.Emp_no },
  const handleDelete = async (id) => {debugger
    if (window.confirm("Are you sure you want to delete this Customer Detail?")) {
      try {
        await deleteCustomerDetail(id);
        loadCustomerDetail();
        alert("Customer Detail deleted successfully.");
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete Customer Detail.");
      }
    }
  };
  
  
   
    const columns = [
        { field: "Cust_code", headerName: "Code", width: 120 },
        { field: "Cust_name", headerName: "Name", width: 180 },
        { field: "Cust_country", headerName: "Country", width: 150 },
        { field: "Email", headerName: "Email", width: 160 },
        { field: "gst_no", headerName: "GST", width: 220 },

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
                        <IconButton onClick={() => handleDelete(params.row.Cust_code)}>
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
                    routeSegments={[
                        { name: "Master" },
                        { name: "Customer Detail" },
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
                        Add New
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
