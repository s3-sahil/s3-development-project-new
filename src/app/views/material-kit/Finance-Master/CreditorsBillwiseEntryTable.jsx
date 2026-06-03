import { Container, Icon, IconButton, Tooltip, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "app/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CROS_MST_PaginationAPI } from "app/utils/authServices";

export default function CreditorsBillwiseEntryTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadCROS_MST = async () => {
    setLoading(true);
    const res = await CROS_MST_PaginationAPI("CROS_MST", page + 1, pageSize);

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
    loadCROS_MST();
  }, [page, pageSize]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this CROS_MST?")) {
      try {
        await deleteCROS_MST(id);
        loadCROS_MST();
        alert("CROS_MST deleted successfully.");
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete CROS_MST.");
      }
    }
  };

  const columns = [
    { field: "subCode", headerName: "Sub Code", flex: 1 },
    { field: "voucherNo", headerName: "Voucher No", flex: 1 },
    { field: "voucherDate", headerName: "Voucher Date", flex: 1 },
    { field: "voucherType", headerName: "Voucher Type", flex: 1 },
    { field: "invoiceNo", headerName: "Invoice No", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", flex: 1 },
    { field: "billAmt", headerName: "Bill Amt", flex: 1 },
    { field: "balanceAmt", headerName: "Balance Amt", flex: 1 },
    { field: "dueDate", headerName: "Due Date", flex: 1 },
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
                  `/material/finance-creditors-billwise-entry-form/edit/${params.row.id}`,
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
          routeSegments={[
            { name: "Finace" },
            { name: "Creditors Billwise Entry" },
          ]}
        />
      </Box>

      <Stack spacing={3}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={() =>
              navigate("/material/finance-creditors-billwise-entry-form/add")
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
