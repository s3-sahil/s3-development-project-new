import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { account_master_PaginationAPI } from "app/utils/authServices";

export default function GeneralLedgerTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadaccount_master = async () => {
    setLoading(true);
    const res = await account_master_PaginationAPI(
      "account_master",
      page + 1,
      pageSize,
    );

    if (res?.Data) {
      setRows(
        res.Data.map((item, index) => ({
          id: item.id || index + 1,
          ...item,
        })),
      );
      setRowCount(res.TotalCount || 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadaccount_master();
  }, [page, pageSize]);

  const handleDelete = async (id) => {
    debugger;
    if (
      window.confirm("Are you sure you want to delete this account_master?")
    ) {
      try {
        await deleteaccount_master(id);
        loadaccount_master();
        alert("account_master deleted successfully.");
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete account_master.");
      }
    }
  };

  const columns = [
    { field: "acc_code", headerName: "GL Code", flex: 1 },
    { field: "desc", headerName: "General Ledger Name", flex: 2 },
    { field: "group_code", headerName: "Group Code", flex: 1 },
    { field: "sch_no", headerName: "Schedule Code", flex: 1 },
    { field: "Purchase_Reg", headerName: "Purchase Reg", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                navigate(
                  `/material/finance-general-ledger-form/edit/${params.row.id}`,
                  {
                    state: {
                      ...params.row,
                      isEdit: true,
                    },
                  },
                )
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
        <Breadcrumb
          routeSegments={[{ name: "Finance" }, { name: "General Ledger" }]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/finance-general-ledger-form/add")
            }
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
