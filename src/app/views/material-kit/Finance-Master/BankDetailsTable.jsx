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
import { Bank_master_PaginationAPI } from "app/utils/authServices";

export default function BankDetailsTable() {
      const navigate = useNavigate();
        const [rows, setRows] = useState([]);
        const [page, setPage] = useState(0); 
        const [pageSize, setPageSize] = useState(10);
        const [rowCount, setRowCount] = useState(0);
        const [loading, setLoading] = useState(false);
      
        const loadBank_master = async () => {
          setLoading(true);
          const res = await Bank_master_PaginationAPI(
            "Bank_master",
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
          loadBank_master();
        }, [page, pageSize]);
        
        const handleDelete = async (id) => {
          if (window.confirm("Are you sure you want to delete this Bank_master?")) {
            try {
              await deleteBank_master(id);
              loadBank_master();
              alert("Bank_master deleted successfully.");
            } catch (error) {
              console.error("Delete Error:", error);
              alert("Failed to delete Bank_master.");
            }
          }
        };

  const columns = [
    { field: "Bank_code", headerName: "Bank Code", flex: 1 },
    { field: "Bank_name", headerName: "Bank Name", flex: 2 },
    { field: "Phone", headerName: "Phone", flex: 2 },
    { field: "Bank_add1", headerName: "Address", flex: 1 },
    { field: "Acc_code", headerName: "Acc Code", flex: 1 },
    { field: "Cheque_flag", headerName: "Cheque", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-bank-details-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finance" }, { name: "Bank Details" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-bank-details-form/add")}
          >
            New
          </Button>
        </Box>

        <Box sx={{ height: 620 }}>
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