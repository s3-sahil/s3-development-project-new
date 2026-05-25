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
import { DEPRECIATION_PARA_PaginationAPI } from "app/utils/authServices";

export default function DepreciationParameterTable() {
  const navigate = useNavigate();
          const [rows, setRows] = useState([]);
          const [page, setPage] = useState(0); 
          const [pageSize, setPageSize] = useState(10);
          const [rowCount, setRowCount] = useState(0);
          const [loading, setLoading] = useState(false);
        
          const loadDEPRECIATION_PARA = async () => {
            setLoading(true);
            const res = await DEPRECIATION_PARA_PaginationAPI(
              "DEPRECIATION_PARA",
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
            loadDEPRECIATION_PARA();
          }, [page, pageSize]);
          
          const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this DEPRECIATION_PARA?")) {
              try {
                await deleteDEPRECIATION_PARA(id);
                loadDEPRECIATION_PARA();
                alert("DEPRECIATION_PARA deleted successfully.");
              } catch (error) {
                console.error("Delete Error:", error);
                alert("Failed to delete DEPRECIATION_PARA.");
              }
            }
          };
  const columns = [
    { field: "mode", headerName: "Mode", flex: 1 },
    { field: "groupCode", headerName: "Group Code / GL Code", flex: 1 },
    { field: "subGroup", headerName: "Sub Group", flex: 2 },
    { field: "depreciation", headerName: "Depreciation %", flex: 1 },
    { field: "companyAct", headerName: "As per Company Act", flex: 1 },
    { field: "incomeTax", headerName: "As per Income Tax", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(`/material/finance-depreciation-parameter-form/edit/${params.row.id}`, {
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
        <Breadcrumb routeSegments={[{ name: "Finace" }, { name: "Depreciation Parameter" }]} />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() => navigate("/material/finance-depreciation-parameter-form/add")}
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